import Announcement from './Announcement';
import Header from './Header';
import Footer from './Footer';

function CommonLayout({ children }) {
  return (
    <div className="app-shell">
      <Announcement />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default CommonLayout;
