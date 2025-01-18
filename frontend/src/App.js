import { BrowserRouter, Routes, Route } from 'react-router-dom';


//pages & components
import Home from './pages/home';
import ItemsPage from './pages/items-page';
import Item from './pages/item';
import Cart from './pages/cart';
import OrdersPage from './pages/orders';
import DeliveryPage from './pages/delivery';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>

            {/* Home Page */}
            <Route path='/' element={<Home />} />

            {/* Home Page */}
            <Route path='/home' element={<Home />} />
            <Route path="/home/:userId" element={<Home />} />

            {/* All Items Page */}
            <Route path='/items' element={<ItemsPage />} />

            {/* Single Item Page */}
            <Route path="/items/:id" element={<Item />} />

            {/* My Cart Page */}
            <Route path='/mycart' element ={<Cart />} />

            {/* Orders Page */}
            <Route path='/orders' element={<OrdersPage />} />

            {/* Delivery Page */}
            <Route path='/delivery' element={<DeliveryPage />} />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
