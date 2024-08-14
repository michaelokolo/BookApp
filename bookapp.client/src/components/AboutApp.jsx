import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import picture1 from '../assets/images/picture1.jpg';

const AboutApp = () => {
    return (
        <Container className="about-app mt-5" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid #dee2e6', borderRadius: '10px', padding: '20px' }}>
            <h1 className="text-center mb-4" style={{ color: '#343a40', fontWeight: 'bold' }}><span style={{ color: '#ffc107' }} >About</span> the App</h1>
            <Row className="align-items-center">
                <Col md={6}>
                    <img
                        src={picture1}
                        alt="About the App"
                        className="img-fluid rounded"
                        style={{ width: '100%', borderRadius: '10px', transition: 'transform 0.3s', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                </Col>
                <Col md={6}>
                    <p style={{ fontSize: '1.2rem', color: 'black', fontWeight: 'lighter' }}>
                        Our app provides a comprehensive collection of books from various genres. Whether you're looking for fiction, non-fiction, or educational materials, we have something for everyone. Our user-friendly interface makes it easy to browse, update, and manage your book collection.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default AboutApp;