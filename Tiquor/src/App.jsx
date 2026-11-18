import CommonLayout from './components/common/CommonLayout';
import { ShopProvider } from './context/ShopContext';
import Route from './routes/route';

function App() {
  return (
    <ShopProvider>
      <CommonLayout>
        <Route />
      </CommonLayout>
    </ShopProvider>
  );
}

export default App;
