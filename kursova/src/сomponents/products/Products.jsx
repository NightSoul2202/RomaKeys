import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, InputNumber, Typography, Modal, Select } from 'antd';
import ProductCard from '../productCard/ProductCard.jsx';
import { useProducts } from '../productsProvider/ProductsProvider.jsx';

const { Title } = Typography;
const { Option } = Select;

const Products = () => {
  const { products, addProduct, deleteProduct } = useProducts();
  const [isEditing, setIsEditing] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchText, setSearchText] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [sortOrder, setSortOrder] = useState('');

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userName = JSON.parse(localStorage.getItem('user'));
    if (userName.username === 'admin') {
      setIsAdmin(true);
    }
    setFilteredProducts(products);
  }, [products]);

  const handleAddProduct = (values) => {
    const newProduct = {
      id: Date.now(),
      ...values,
      systemRequirements: {
        min: JSON.parse(values.systemRequirementsMin),
        rec: JSON.parse(values.systemRequirementsRec),
      },
    };
    addProduct(newProduct);
    Modal.success({ title: 'Game Added Successfully!' });
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id);
    Modal.warning({ title: 'Game Deleted!' });
  };

  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
    filterProducts(value, filterGenre, priceRange, sortOrder);
  };

  const handleGenreChange = (value) => {
    setFilterGenre(value);
    filterProducts(searchText, value, priceRange, sortOrder);
  };

  const handlePriceChange = (type, value) => {
    setPriceRange((prev) => {
      const updatedRange = { ...prev, [type]: value || 0 };
      filterProducts(searchText, filterGenre, updatedRange, sortOrder);
      return updatedRange;
    });
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    filterProducts(searchText, filterGenre, priceRange, value);
  };

  const filterProducts = (search, genre, range, sort) => {
    let filtered = products.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesGenre = genre ? product.genre === genre : true;
      const matchesPrice =
        product.price >= (range.min || 0) && product.price <= (range.max || Infinity);
      return matchesName && matchesGenre && matchesPrice;
    });

    if (sort === 'priceAsc') {
      filtered = filtered.sort((a, b) => a.price - b.price); 
    } else if (sort === 'priceDesc') {
      filtered = filtered.sort((a, b) => b.price - a.price); 
    } else if (sort === 'nameAsc') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'nameDesc') {
      filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProducts(filtered);
  };

  return (
    <section style={{ padding: '20px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        {isEditing ? 'Edit Products' : 'Available Products'}
      </Title>

      {/* Кнопка перемикання режиму */}
      {isAdmin && (
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Button
            type="primary"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? 'Exit Edit Mode' : 'Edit Products'}
          </Button>
        </div>
      )}

      {/* Форма для додавання нових ігор доступна тільки адміністраторам */}
      {isAdmin && isEditing && (
        <div style={{ marginBottom: '30px' }}>
          <Title level={4}>Add a New Game</Title>
          <Form layout="vertical" onFinish={handleAddProduct}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please enter the game name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Genre"
              name="genre"
              rules={[{ required: true, message: 'Please select the genre' }]}
            >
              <Select placeholder="Select genre">
                <Option value="Action">Action</Option>
                <Option value="RPG">RPG</Option>
                <Option value="Rogue-like">Rogue-like</Option>
                <Option value="Adventure">Adventure</Option>
                <Option value="Shooter">Shooter</Option>
                <Option value="Platformer">Platformer</Option>
                <Option value="Puzzle">Puzzle</Option>
                <Option value="Strategy">Strategy</Option>
                <Option value="Simulation">Simulation</Option>
                <Option value="Sports">Sports</Option>
                <Option value="Fighting">Fighting</Option>
                <Option value="Racing">Racing</Option>
                <Option value="MMO">MMO</Option>
                <Option value="Horror">Horror</Option>
                <Option value="Survival">Survival</Option>
                <Option value="Music">Music</Option>
                <Option value="Party">Party</Option>
                <Option value="Sandbox">Sandbox</Option>
                <Option value="Visual Novel">Visual Novel</Option>
                <Option value="Idle">Idle</Option>
                <Option value="Tactical">Tactical</Option>
                <Option value="Battle Royale">Battle Royale</Option>
                <Option value="Open World">Open World</Option>
                <Option value="Metroidvania">Metroidvania</Option>
                <Option value="Board Game">Board Game</Option>
                <Option value="Dating Sim">Dating Sim</Option>
                <Option value="Hack and Slash">Hack and Slash</Option>
                <Option value="Stealth">Stealth</Option>
                <Option value="Simulation">Simulation</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Image URL"
              name="imageUrl"
              rules={[{ required: true, message: 'Please enter the image URL' }]}
            >
              <Input placeholder="Enter image URL" />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: 'Please enter the price' }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: 'Please enter the description' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item
              label="System Requirements (Min)"
              name="systemRequirementsMin"
              rules={[
                {
                  required: true,
                  message: 'Please enter minimum system requirements as JSON',
                },
              ]}
            >
              <Input placeholder='{"cpu":"Intel", "gpu":"GTX", "ram":8, "storage":50}' />
            </Form.Item>
            <Form.Item
              label="System Requirements (Rec)"
              name="systemRequirementsRec"
              rules={[
                {
                  required: true,
                  message: 'Please enter recommended system requirements as JSON',
                },
              ]}
            >
              <Input placeholder='{"cpu":"Intel", "gpu":"RTX", "ram":16, "storage":70}' />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Add Game
            </Button>
          </Form>
        </div>
      )}

      {/* Фільтри */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Input
          placeholder="Search by name"
          allowClear
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: '300px' }}
        />
        <Select
          placeholder="Filter by genre"
          allowClear
          onChange={handleGenreChange}
          style={{ width: '200px' }}
        >
          <Option value="Action">Action</Option>
          <Option value="RPG">RPG</Option>
          <Option value="Rogue-like">Rogue-like</Option>
          <Option value="Adventure">Adventure</Option>
          <Option value="Shooter">Shooter</Option>
          <Option value="Platformer">Platformer</Option>
          <Option value="Puzzle">Puzzle</Option>
          <Option value="Strategy">Strategy</Option>
          <Option value="Simulation">Simulation</Option>
          <Option value="Sports">Sports</Option>
          <Option value="Fighting">Fighting</Option>
          <Option value="Racing">Racing</Option>
          <Option value="MMO">MMO</Option>
          <Option value="Horror">Horror</Option>
          <Option value="Survival">Survival</Option>
          <Option value="Music">Music</Option>
          <Option value="Party">Party</Option>
          <Option value="Sandbox">Sandbox</Option>
          <Option value="Visual Novel">Visual Novel</Option>
          <Option value="Idle">Idle</Option>
          <Option value="Tactical">Tactical</Option>
          <Option value="Battle Royale">Battle Royale</Option>
          <Option value="Open World">Open World</Option>
          <Option value="Metroidvania">Metroidvania</Option>
          <Option value="Board Game">Board Game</Option>
          <Option value="Dating Sim">Dating Sim</Option>
          <Option value="Hack and Slash">Hack and Slash</Option>
          <Option value="Stealth">Stealth</Option>
          <Option value="Simulation">Simulation</Option>

        </Select>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <InputNumber
            placeholder="Min Price"
            min={0}
            onChange={(value) => handlePriceChange('min', value)}
          />
          <InputNumber
            placeholder="Max Price"
            min={0}
            onChange={(value) => handlePriceChange('max', value)}
          />
        </div>
        <Select
          placeholder="Sort by"
          onChange={handleSortChange}
          style={{ width: '200px' }}
        >
          <Option value="priceAsc">Price: Low to High</Option>
          <Option value="priceDesc">Price: High to Low</Option>
          <Option value="nameAsc">Name: A to Z</Option>
          <Option value="nameDesc">Name: Z to A</Option>
        </Select>
      </div>

      {/* Список товарів */}
      <Row gutter={[16, 16]}>
        {filteredProducts.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8}>
            <ProductCard 
              product={product} 
              isEditing={isEditing}
              onDelete={() => isAdmin && handleDeleteProduct(product.id)}  // Видалення доступне тільки адміністраторам
            />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default Products;
