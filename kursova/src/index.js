import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './сomponents/authContext/AuthContext';
import { CartProvider } from './сomponents/cartContext/CartContext';
import { ProductsProvider } from './сomponents/productsProvider/ProductsProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  </React.StrictMode>
);
