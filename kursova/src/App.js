import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Button } from 'antd';
import Login from './сomponents/login/Login.jsx';
import Register from './сomponents/register/Register.jsx';
import Cart from './сomponents/cart/Cart.jsx';
import Products from './сomponents/products/Products.jsx';
import Home from './сomponents/home/Home.jsx';
import { useAuth } from './сomponents/authContext/AuthContext.jsx';
import PrivateRoute from './сomponents/privateRoute/PrivateRoute.jsx';
import Checkout from './сomponents/checkout/Checkout.jsx';

const { Header, Content, Footer } = Layout;

const App = () => {
  const { user, logout } = useAuth();

  return (
    <Router>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Menu theme="dark" mode="horizontal" selectable={false} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flex: 1 }}>
              <Menu.Item key="1">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/products">Products</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/cart">Cart</Link>
              </Menu.Item>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {user ? (
                <>
                  <Menu.Item key="4">
                    <span style={{ color: 'white' }}>Welcome, {user.username}</span>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <Button type="link" onClick={logout}>
                      Logout
                    </Button>
                  </Menu.Item>
                </>
              ) : (
                <>
                  <Menu.Item key="6">
                    <Link to="/login">Login</Link>
                  </Menu.Item>
                  <Menu.Item key="7">
                    <Link to="/register">Register</Link>
                  </Menu.Item>
                </>
              )}
            </div>
          </Menu>
        </Header>
        <Content style={{ padding: '100px 200px 200px 200px', minHeight: '92vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <Products />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Game Keys Store ©2024 Created by NightSoul
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
