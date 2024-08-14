import { Container, Button, Form, FormControl, Row, Col } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import picture1 from '../assets/images/picture1.jpg';
import picture2 from '../assets/images/picture2.jpg';
import picture3 from '../assets/images/picture3.jpg';

function HeroSection() {
    return (
        <div className="text-center  py-5">
            <Container>
                <h1 className="display-3 font-weight-bold">Welcome to the <span style={{ color: '#ffc107', fontWeight: 'bold' }}>BookApp.</span></h1>
                <Row className='d-flex justify-content-center'>
                    <Col md={8} >
                        <p className="lead">
                            Collect and manage your favorite books. Discover new reads, keep track of your personal library, and connect with a community of book lovers.
                        </p>
                    </Col>
                </Row>
                
                <Row className='d-flex justify-content-center'>
                    <Col xs={12} md={8} lg={6}>
                        <Form className="d-flex justify-content-center mt-4">
                            <FormControl
                                type="search"
                                placeholder="Search for books..."
                                className="mr-2"
                                aria-label="Search"
                                style={{padding:'0.8rem'} }
                            />
                            <Button variant="warning" style={{padding:'0rem 1rem'}} className="ms-3">Search</Button>
                        </Form>
                    </Col>
                </Row>
                
                <Carousel className='mt-5'>
                    <Carousel.Item>
                        <img src={picture1} alt="First slide" className="d-block w-100" style={{ height: '400px', objectFit: 'cover' }} />
                        <Carousel.Caption style={{ color: 'black' }}>
                            <h3>Discover New Books</h3>
                            <p>Explore a vast collection of books from various genres and authors.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={picture2} alt="Second slide" className="d-block w-100" style={{ height: '400px', objectFit: 'cover' }} />
                        <Carousel.Caption style={{ color: 'purple' }}>
                            <h3>Manage Your Collection</h3>
                            <p>Keep track of your personal library and manage your book collection with ease.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src={picture3} alt="Third slide" className="d-block w-100" style={{ height: '400px', objectFit: 'cover' }} />
                        <Carousel.Caption style={{ color: 'black' }}>
                            <h3>Join Our Community</h3>
                            <p>Connect with other book lovers, share reviews, and recommend your favorite reads.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>
        </div>
    );
}

export default HeroSection;