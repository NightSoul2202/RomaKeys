import React, { useState } from 'react';
import { Card, Button, Modal, message } from 'antd';
import { useCart } from '../cartContext/CartContext.jsx';

const { Meta } = Card;

const ProductCard = ({ product, onDelete, isEditing }) => {
  const { addToCart } = useCart();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddToCart = (product) => {
    addToCart(product);
    message.success(`${product.name} was added to cart`);
  };

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleDelete = () => {
    onDelete(product.id);
    setIsModalVisible(false);
  };

  return (
    <>
      <Card
        hoverable
        onClick={handleShowModal}
        cover={<img alt={product.name} src={`${product.imageUrl}`} style={{ width: '100%', height: '500px', objectFit: 'cover' }} />}
      >
        <Meta title={product.name} description={`Price: $${product.price}`} />
        <Button
          type="primary"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product);
          }}
          style={{ marginTop: '10px' }}
        >
          Add to Cart
        </Button>
      </Card>


      <Modal
        title={product.name}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          isEditing && (
            <>
              <Button onClick={handleDelete} type="primary">
                Delete
              </Button>
            </>
          ),
        ]}
      >
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Minimum System Requirements:</strong></p>
        <ul>
          <li>CPU: {product.systemRequirements.min.cpu}</li>
          <li>GPU: {product.systemRequirements.min.gpu}</li>
          <li>RAM: {product.systemRequirements.min.ram} GB</li>
          <li>Storage: {product.systemRequirements.min.storage} GB</li>
        </ul>
        <p><strong>Recommended System Requirements:</strong></p>
        <ul>
          <li>CPU: {product.systemRequirements.rec.cpu}</li>
          <li>GPU: {product.systemRequirements.rec.gpu}</li>
          <li>RAM: {product.systemRequirements.rec.ram} GB</li>
          <li>Storage: {product.systemRequirements.rec.storage} GB</li>
        </ul>
      </Modal>
    </>
  );
};

export default ProductCard;
