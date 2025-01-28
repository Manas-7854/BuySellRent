// Required Modules 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages & components
import LandingPage from './pages/landing';
import Home from './pages/home';
import ItemsPage from './pages/items-page';
import Item from './pages/item';
import Cart from './pages/cart';
import OrdersPage from './pages/orders';
import DeliveryPage from './pages/delivery';
import Login from './pages/login';
import Register from './pages/register';
import AddItem from './pages/add-item';
import ChatPage from './pages/chat';
import Logout from './components/logout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>

            {/* Landing Page */}
            <Route path='/' element={<LandingPage />} />

            {/* Login Page */}
            <Route path='/login' element={<Login />} />
            {/* Register Page */}
            <Route path='/register' element={<Register />} />

            {/* Home Page */}
            <Route path='/home' element={<Home />} />
            <Route path="/home/:userId" element={<Home />} />

            {/* All Items Page */}
            <Route path='/items' element={<ItemsPage />} />
            <Route path='/items/:userId' element={<ItemsPage />} />

            {/* Single Item Page */}
            <Route path="/item/:itemId/:userId" element={<Item />} />

            {/* My Cart Page */}
            <Route path='/mycart' element ={<Cart />} />
            <Route path='/mycart/:userId' element ={<Cart />} />

            {/* Orders Page */}
            <Route path='/orders' element={<OrdersPage />} />
            <Route path='/orders/:userId' element ={<OrdersPage />} />

            {/* Delivery Page */}
            <Route path='/delivery' element={<DeliveryPage />} />
            <Route path='/delivery/:userId' element ={<DeliveryPage />} />

            {/* Add Items Page */}
            <Route path='/add-item/:userId' element={<AddItem />} />

            {/* Chat Page */}
            <Route path='/chat' element={<ChatPage />} />
            <Route path='/chat/:userId' element={<ChatPage />} />

            {/* Logout Page */}
            <Route path='/logout' element={<Logout />} />


          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
