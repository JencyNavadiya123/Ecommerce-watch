param([string]$InDir, [string]$OutDir, [int]$CanvasW = 640, [int]$CanvasH = 800)

Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public static class WatchCleaner {
    static int[] Read(Bitmap b) {
        var r = new Rectangle(0, 0, b.Width, b.Height);
        var d = b.LockBits(r, ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
        var px = new int[b.Width * b.Height];
        Marshal.Copy(d.Scan0, px, 0, px.Length);
        b.UnlockBits(d);
        return px;
    }

    static Bitmap Write(int[] px, int w, int h) {
        var b = new Bitmap(w, h, PixelFormat.Format32bppArgb);
        var d = b.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
        Marshal.Copy(px, 0, d.Scan0, px.Length);
        b.UnlockBits(d);
        return b;
    }

    static int R(int c) { return (c >> 16) & 255; }
    static int G(int c) { return (c >> 8) & 255; }
    static int B(int c) { return c & 255; }

    // Returns a log line.
    public static string Clean(string inPath, string outPath, int cw, int ch) {
        Bitmap src;
        using (var tmp = new Bitmap(inPath)) src = new Bitmap(tmp);
        int w = src.Width, h = src.Height;
        int[] px = Read(src);
        src.Dispose();

        // 0. Flatten any transparency onto white.
        for (int i = 0; i < px.Length; i++) {
            int c = px[i];
            int a = (c >> 24) & 255;
            int r = (R(c) * a + 255 * (255 - a)) / 255;
            int g = (G(c) * a + 255 * (255 - a)) / 255;
            int bl = (B(c) * a + 255 * (255 - a)) / 255;
            px[i] = unchecked((int)0xFF000000) | (r << 16) | (g << 8) | bl;
        }

        // 1. Background colour = top-left corner. Levels-stretch so it becomes pure white.
        int bg = px[5 * w + 5];
        double fr = 255.0 / Math.Max(1, R(bg)), fg = 255.0 / Math.Max(1, G(bg)), fb = 255.0 / Math.Max(1, B(bg));
        for (int i = 0; i < px.Length; i++) {
            int c = px[i];
            int r = (int)Math.Min(255, Math.Round(R(c) * fr));
            int g = (int)Math.Min(255, Math.Round(G(c) * fg));
            int bl = (int)Math.Min(255, Math.Round(B(c) * fb));
            px[i] = unchecked((int)0xFF000000) | (r << 16) | (g << 8) | bl;
        }

        // 2. Connected components of non-white pixels; erase small blobs that sit in a
        //    bottom or top corner (screenshot UI leftovers such as heart icons / page numbers).
        Func<int, bool> ink = c => (R(c) < 235 || G(c) < 235 || B(c) < 235);
        var label = new int[px.Length];
        int erased = 0;
        var stack = new Stack<int>();
        int next = 1;
        for (int s = 0; s < px.Length; s++) {
            if (label[s] != 0 || !ink(px[s])) continue;
            var members = new List<int>();
            int minX = w, minY = h, maxX = 0, maxY = 0;
            label[s] = next; stack.Push(s);
            while (stack.Count > 0) {
                int p = stack.Pop(); members.Add(p);
                int x = p % w, y = p / w;
                if (x < minX) minX = x; if (x > maxX) maxX = x;
                if (y < minY) minY = y; if (y > maxY) maxY = y;
                for (int dy = -1; dy <= 1; dy++) for (int dx = -1; dx <= 1; dx++) {
                    int nx = x + dx, ny = y + dy;
                    if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
                    int q = ny * w + nx;
                    if (label[q] == 0 && ink(px[q])) { label[q] = next; stack.Push(q); }
                }
            }
            next++;
            bool small = (maxX - minX) < w * 0.15 && (maxY - minY) < h * 0.15;
            bool inCorner = (maxX < w * 0.22 || minX > w * 0.78) && (minY > h * 0.80 || maxY < h * 0.20);
            bool atSide = maxX < w * 0.13 || minX > w * 0.87;
            if (small && (inCorner || atSide)) {
                foreach (int p in members) px[p] = unchecked((int)0xFFFFFFFF);
                erased += members.Count;
            }
        }

        // 3. Bounding box of the remaining watch.
        int bx0 = w, by0 = h, bx1 = -1, by1 = -1;
        for (int y = 0; y < h; y++) for (int x = 0; x < w; x++) {
            if (!ink(px[y * w + x])) continue;
            if (x < bx0) bx0 = x; if (x > bx1) bx1 = x;
            if (y < by0) by0 = y; if (y > by1) by1 = y;
        }
        int cwSrc = bx1 - bx0 + 1, chSrc = by1 - by0 + 1;
        bool bleeds = by0 <= h * 0.03 && by1 >= h * 0.97; // strap runs off the top and bottom edges

        // 4. Place on a white canvas of fixed aspect ratio.
        double scale = bleeds
            ? Math.Min(ch * 0.92 / chSrc, cw * 0.64 / cwSrc)
            : Math.Min(ch * 0.84 / chSrc, cw * 0.80 / cwSrc);
        int dw = (int)Math.Round(cwSrc * scale), dh = (int)Math.Round(chSrc * scale);
        int ox = (cw - dw) / 2, oy = (ch - dh) / 2;

        using (var cleaned = Write(px, w, h))
        using (var canvas = new Bitmap(cw, ch, PixelFormat.Format24bppRgb))
        using (var gfx = Graphics.FromImage(canvas)) {
            gfx.Clear(Color.White);
            gfx.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
            gfx.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighQuality;
            gfx.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
            using (var ia = new ImageAttributes()) {
                ia.SetWrapMode(System.Drawing.Drawing2D.WrapMode.TileFlipXY);
                gfx.DrawImage(cleaned, new Rectangle(ox, oy, dw, dh), bx0, by0, cwSrc, chSrc, GraphicsUnit.Pixel, ia);
            }
            if (bleeds) {
                // Fade the cut-off strap ends into the white background.
                int fade = (int)(dh * 0.16);
                var top = new Rectangle(0, oy - 1, cw, fade + 1);
                var bot = new Rectangle(0, oy + dh - fade, cw, fade + 1);
                using (var gt = new System.Drawing.Drawing2D.LinearGradientBrush(top, Color.FromArgb(255, 255, 255, 255), Color.FromArgb(0, 255, 255, 255), 90f))
                using (var gb = new System.Drawing.Drawing2D.LinearGradientBrush(bot, Color.FromArgb(0, 255, 255, 255), Color.FromArgb(255, 255, 255, 255), 90f)) {
                    gfx.FillRectangle(gt, top);
                    gfx.FillRectangle(gb, bot);
                }
            }
            canvas.Save(outPath, ImageFormat.Png);
        }
        return String.Format("bg=({0},{1},{2}) erased={3}px bbox={4}x{5} bleeds={6} scale={7:0.00}",
            R(bg), G(bg), B(bg), erased, cwSrc, chSrc, bleeds, scale);
    }
}
"@

New-Item -ItemType Directory -Force $OutDir | Out-Null
Get-ChildItem $InDir -Filter *.png | ForEach-Object {
    $out = Join-Path $OutDir $_.Name
    "{0,-26} {1}" -f $_.Name, [WatchCleaner]::Clean($_.FullName, $out, $CanvasW, $CanvasH)
}
