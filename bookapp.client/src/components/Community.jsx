import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import picture3 from '../assets/images/picture3.jpg';

const Community = () => {
    return (
        <Container className="community mt-5" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #dee2e6', borderRadius: '10px', padding: '20px' }}>
            <h1 className="text-center mb-4" style={{ color: '#343a40', fontWeight: 'bold' }}>Join Our <span style={{ color: '#ffc107' }}>Community</span></h1>
            <Row className="align-items-center">
                <Col md={6}>
                    <p style={{ fontSize: '1.2rem', color: 'black', fontWeight: 'lighter' }}>
                        Join our community of book lovers and share your favorite reads with others. Participate in discussions, write reviews, and connect with like-minded individuals. Our community is a great place to discover new books and share your passion for reading.
                    </p>
                </Col>
                <Col md={6}>
                    <img
                        src={picture3}
                        alt="Community"
                        className="img-fluid rounded"
                        style={{ width: '100%', borderRadius: '10px', transition: 'transform 0.3s', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Community;