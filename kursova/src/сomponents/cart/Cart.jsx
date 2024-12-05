import React from 'react';
import { Link } from 'react-router-dom';
import { List, Button, Typography, Divider } from 'antd';
import { useCart } from '../cartContext/CartContext.jsx';

const { Title, Text } = Typography;

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <section style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        Your Cart
      </Title>
      {cartItems.length === 0 ? (
        <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginTop: '20px' }}>
          Your cart is empty.
        </Text>
      ) : (
        <>
          <List
            dataSource={cartItems}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                actions={[
                  <Button
                    type="link"
                    danger
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={<Text strong>{item.name}</Text>}
                  description={`Price: $${item.price} × ${item.quantity}`}
                />
                <Text strong>Total: ${(item.price * item.quantity).toFixed(2)}</Text>
              </List.Item>
            )}
            bordered
            style={{ marginBottom: '20px' }}
          />
          <Divider />
          <Title level={3} style={{ textAlign: 'right' }}>
            Total Price: ${totalPrice.toFixed(2)}
          </Title>
          <Link to="/checkout">
            <Button type="primary" size="large">
              Proceed to Checkout
            </Button>
          </Link>
        </>
      )}
    </section>
  );
};

export default Cart;
