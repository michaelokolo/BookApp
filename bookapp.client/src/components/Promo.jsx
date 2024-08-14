import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import picture5 from '../assets/images/picture5.jpg';

const Promo = () => {
    return (
        <Container className="promo mt-5 mb-5" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #dee2e6', borderRadius: '10px', padding: '20px' }}>
            <h1 className="text-center mb-4" style={{ color: '#343a40', fontWeight: 'bold' }}><span style={{ color: '#ffc107' }}>Special</span> Promotion</h1>
            <Row className="align-items-center">
                <Col md={6}>
                    <img
                        src={picture5}
                        alt="Promotion"
                        className="img-fluid rounded"
                        style={{ width: '100%', borderRadius: '10px', transition: 'transform 0.3s', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                </Col>
                <Col md={6}>
                    <p style={{ fontSize: '1.2rem', color: 'black', fontWeight: 'lighter' }}>
                        Don't miss out on our special promotion! Get exclusive discounts on our premium book collection. Sign up now and enjoy a world of reading at your fingertips.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Promo;