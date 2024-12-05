import React from 'react';
import { Card, Row, Col, Carousel, Statistic } from 'antd';
import { UserOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Meta } = Card;

const Home = () => {
  return (
    <section style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Welcome to Game Keys Store</h1>
      <p style={{ textAlign: 'center', marginBottom: '40px' }}>Buy your favorite games at the best prices!</p>

      {/* Carousel Section */}
      <Carousel autoplay>
        <div>
          <h3 style={{ background: '#364d79', color: 'white', padding: '60px 0', textAlign: 'center' }}>
            Special Offers on Popular Games!
          </h3>
        </div>
        <div>
          <h3 style={{ background: '#9c27b0', color: 'white', padding: '60px 0', textAlign: 'center' }}>
            Get Discounted Game Keys - Limited Time Only!
          </h3>
        </div>
        <div>
          <h3 style={{ background: '#f57c00', color: 'white', padding: '60px 0', textAlign: 'center' }}>
            Exclusive Bundles Available!
          </h3>
        </div>
      </Carousel>

      {/* Why Choose Us Section */}
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <h2>Why Choose Us?</h2>
        <p>We offer the best prices, fast delivery, and top-notch customer support. Shop with confidence and get your game keys instantly!</p>

        <Row gutter={16}>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="fast-delivery" style={{ width: '100%', height: '500px', objectFit: 'cover' }} src="https://t3.ftcdn.net/jpg/04/73/02/64/360_F_473026422_k3XjtqTh0Br3Iw8IfhlB9c72n9dqi9n5.jpg" />}
            >
              <Meta title="Fast Delivery" description="Get your game keys instantly!" />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="best-prices" style={{ width: '100%', height: '500px', objectFit: 'cover' }} src="https://png.pngtree.com/png-vector/20230328/ourmid/pngtree-best-price-icon-design-vector-png-image_6673126.png" />}
            >
              <Meta title="Best Prices" description="We offer the lowest prices on all games!" />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="customer-support" style={{ width: '100%', height: '500px', objectFit: 'cover' }} src="https://www.notifyvisitors.com/pb/wp-content/uploads/2020/10/What-is-Customer-Support.jpg" />}
            >
              <Meta title="Customer Support" description="24/7 support for all your inquiries." />
            </Card>
          </Col>
        </Row>
      </div>

      {/* Statistics Section */}
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <h2>Our Achievements</h2>
        <Row gutter={16}>
          <Col span={8}>
            <Statistic
              title="Happy Customers"
              value={112893}
              prefix={<UserOutlined />}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Games Sold"
              value={23876}
              suffix="+"
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Years in Business"
              value={5}
              prefix={<ClockCircleOutlined />}
            />
          </Col>
        </Row>
      </div>

      {/* Customer Reviews Section */}
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <h2>Customer Reviews</h2>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              hoverable
              bordered={false}
              bodyStyle={{ padding: '10px' }}
            >
              <p><strong>John D.</strong> - "Great service, fast delivery. Bought a game at an amazing price!"</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              bordered={false}
              bodyStyle={{ padding: '10px' }}
            >
              <p><strong>Sarah W.</strong> - "I love this store. Excellent customer support and amazing deals!"</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              bordered={false}
              bodyStyle={{ padding: '10px' }}
            >
              <p><strong>Mark T.</strong> - "I was able to get all the games I wanted without breaking the bank!"</p>
            </Card>
          </Col>
        </Row>
      </div>

    </section>
  );
};

export default Home;
