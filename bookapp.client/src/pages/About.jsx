import { Container, Row, Col } from 'react-bootstrap';

function About() {
    const sectionStyle = {
        marginBottom: '20px'
    };

    return (
      <div>
            <Container style={{maxWidth:'50rem', margin:'1.5rem auto'} }>
                <Row>
                    <Col>
                        <h1>About BookApp</h1>
                        <p>Welcome to BookApp, your ultimate solution for managing your personal book collection. Our app is designed to help you keep track of the books you have read, update their details, and remove books that you no longer need.</p>
                    </Col>
                </Row>
                <Row style={sectionStyle}>
                    <Col>
                        <h2>Our Mission</h2>
                        <p>At BookApp, our mission is to provide book enthusiasts with a simple and efficient way to manage their reading collections. We aim to make it easy for you to catalog, update, and organize your books, so you can focus on enjoying your reading journey.</p>
                    </Col>
                </Row>
                <Row style={sectionStyle}>
                    <Col>
                        <h2>Features</h2>
                        <ul>
                            <li>Store your collection of books with detailed information including title, author, genre, and more.</li>
                            <li>Update the details of your books as needed.</li>
                            <li>Delete books that you no longer need from your collection.</li>
                            <li>Search and filter your book collection to find specific books quickly.</li>
                            <li>Sync your book collection across multiple devices for easy access.</li>
                        </ul>
                    </Col>
                </Row>
                <Row style={sectionStyle}>
                    <Col>
                        <h2>Our Team</h2>
                        <p>BookApp is developed by a dedicated team of book lovers and tech enthusiasts. We are committed to continuously improving the app and adding new features based on user feedback.</p>
                    </Col>
                </Row>
                <Row style={sectionStyle}>
                    <Col>
                        <h2>Contact Us</h2>
                        <p>If you have any questions, suggestions, or feedback, please feel free to reach out to us. We would love to hear from you!</p>
                        <p style={{padding: 0, margin:0}}>Email: <a href="mailto:michaelokolo62@yahoo.com">michaelokolo62@yahoo.com</a></p>
                        <p style={{ padding: 0, margin: 0 }}>Phone: +44 758 779 4304</p>
                    </Col>
                </Row>


            </Container>
      </div>
      
  );
}

export default About;