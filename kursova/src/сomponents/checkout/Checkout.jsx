import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useCart } from '../cartContext/CartContext.jsx';
import { Button, Modal, Typography, List } from 'antd';

const { Title, Text } = Typography;

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [isPaymentCompleted, setPaymentCompleted] = useState(false);
  const [gameKeys, setGameKeys] = useState([]);

  const storedProducts = JSON.parse(localStorage.getItem('products')) || [];

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const generateKey = (product) =>
    `${product.name.toUpperCase().replace(/\s/g, '-')}-${Date.now()}`;

  const handlePayment = () => {
    const keys = cartItems.map((item) => {
      const key = generateKey(item);
      const updatedProduct = {
        ...item,
        key,
      };

      const updatedProducts = storedProducts.map((product) =>
        product.id === item.id ? updatedProduct : product
      );
      localStorage.setItem('products', JSON.stringify(updatedProducts));

      return { name: item.name, key };
    });

    setGameKeys(keys);
    setPaymentCompleted(true);
    clearCart();
  };

  return (
    <section style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        Checkout
      </Title>

      <div style={{ marginBottom: '20px' }}>
        <List
          bordered
          dataSource={cartItems}
          renderItem={(item) => (
            <List.Item>
              <Text>
                {item.name} - ${item.price} × {item.quantity}
              </Text>
            </List.Item>
          )}
          footer={
            <div style={{ textAlign: 'right' }}>
              <Title level={4}>Total: ${totalPrice.toFixed(2)}</Title>
            </div>
          }
        />
      </div>

      <div style={{ textAlign: 'center' }}>
        <StripeCheckout
          name="Game Store"
          description="Complete your purchase"
          amount={totalPrice * 100}
          currency="USD"
          stripeKey="pk_test_TYooMQauvdEDq54NiTphI7jx"
          token={handlePayment}
          email="user@example.com"
        />
      </div>

      <Modal
        title="Your Game Keys"
        visible={isPaymentCompleted}
        onOk={() => setPaymentCompleted(false)}
        onCancel={() => setPaymentCompleted(false)}
        footer={[
          <Button key="ok" type="primary" onClick={() => setPaymentCompleted(false)}>
            OK
          </Button>,
        ]}
      >
        <List
          dataSource={gameKeys}
          renderItem={(keyInfo) => (
            <List.Item>
              <Text strong>{keyInfo.name}:</Text> <Text code>{keyInfo.key}</Text>
            </List.Item>
          )}
        />
      </Modal>
    </section>
  );
};

export default Checkout;
