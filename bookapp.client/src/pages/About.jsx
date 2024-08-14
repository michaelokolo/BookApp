import { Container, Row, Col, Card } from 'react-bootstrap';

function About() {
    const sectionStyle = {
        marginBottom: '20px'
    };

    const cardStyle = {
        backgroundColor: '#f8f9fa',
        border: 'none',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    };

    const headerStyle = {
        color: '#343a40',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom:'4rem'
    };

    const subHeaderStyle = {
        color: '#6c757d',
        fontWeight: 'bold'
    };

    return (
        <div>
            <Container style={{ maxWidth: '50rem', margin: '1.5rem auto', marginTop: '4rem', textAlign:'justify'}}>
                <Row>
                    <Col>
                        <h1 style={headerStyle}>About <span style={{ color: '#ffc107' }} >BookApp</span></h1>
                        <p>Welcome to BookApp, your ultimate solution for managing your personal book collection. Our app is designed to help you keep track of the books you have read, update their details, and remove books that you no longer need.</p>
                    </Col>
                </Row>
                <Row style={sectionStyle}>
                    <Col>
                        <Card style={cardStyle}>
                            <Card.Body>
                                <Card.Title style={subHeaderStyle}>Our Mission</Card.Title>
                                <Card.Text>At BookApp, our mission is to provide book enthusiasts with a simple and efficient way to manage their reading collections. We aim to make it easy for you to catalog, update, and organize your books, so you can focus on enjoying your reading journey.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row style={sectionStyle}>
                    <Col>
                        <Card style={cardStyle}>
                            <Card.Body>
                                <Card.Title style={subHeaderStyle}>Features</Card.Title>
                                <ul>
                                    <li>Store your collection of books with detailed information including title, author, genre, and more.</li>
                                    <li>Update the details of your books as needed.</li>
                                    <li>Delete books that you no longer need from your collection.</li>
                                    <li>Search and filter your book collection to find specific books quickly.</li>
                                    <li>Sync your book collection across multiple devices for easy access.</li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row style={sectionStyle}>
                    <Col>
                        <Card style={cardStyle}>
                            <Card.Body>
                                <Card.Title style={subHeaderStyle}>Our Team</Card.Title>
                                <Card.Text>BookApp is developed by a dedicated team of book lovers and tech enthusiasts. We are committed to continuously improving the app and adding new features based on user feedback.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row style={sectionStyle}>
                    <Col>
                        <Card style={cardStyle}>
                            <Card.Body>
                                <Card.Title style={subHeaderStyle}>Contact Us</Card.Title>
                                <Card.Text>If you have any questions, suggestions, or feedback, please feel free to reach out to us. We would love to hear from you!</Card.Text>
                                <p style={{ padding: 0, margin: 0 }}>Email: <a href="mailto:michaelokolo62@yahoo.com">michaelokolo62@yahoo.com</a></p>
                                <p style={{ padding: 0, margin: 0 }}>Phone: +44 758 779 4304</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default About;