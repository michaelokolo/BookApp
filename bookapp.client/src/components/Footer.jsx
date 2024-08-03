import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';



function Footer() {

    const linkStyle = {
        color: 'white',
        textDecoration: 'none'
    };
    const linkStyleHover = {
        textDecoration: 'underline',
    };

  return (
      <footer style={{
          backgroundColor: '#343a40',
          marginTop: 'auto',
          color: 'white',
          fontSize:'1.2rem',
          padding: '20px 0',
          textAlign: 'center',
            }}>
          <Container>
              <Row>
                  <Col md={4}>
                      <h5>BookApp</h5>
                      <p>Your favorite book management app.</p>
                  </Col>
                  <Col md={4}>
                      <h5>Quick Links</h5>
                      <ul style={{ listStyleType: 'none', padding:0 }}>
                          <li >
                              <Link to='/' style={linkStyle}
                                  onMouseOver={(e) => {
                                      e.target.style.textDecoration = linkStyleHover.textDecoration;
                                      e.target.style.color = 'lightblue';
                                  }}
                                  onMouseOut={(e) => {
                                      e.target.style.textDecoration = linkStyle.textDecoration;
                                      e.target.style.color = linkStyle.color;
                                  }}
                              >
                              Home
                              </Link>
                          </li>
                          <li >
                              <Link to='/about' style={linkStyle}
                                  onMouseOver={(e) =>
                                  {
                                      e.target.style.textDecoration = linkStyleHover.textDecoration;
                                      e.target.style.color = 'lightblue'
                                  }}
                                  onMouseOut={(e) => {
                                      e.target.style.textDecoration = linkStyle.textDecoration;
                                      e.target.style.color = linkStyle.color;
                                  }}
                              >
                                  About
                              </Link>
                          </li>
                          <li >
                              <Link
                                  to='/create-book'
                                  style={linkStyle}
                                  onMouseOver={(e) => {
                                      e.target.style.textDecoration = linkStyleHover.textDecoration;
                                      e.target.style.color = 'lightblue'; 
                                  }}
                                  onMouseOut={(e) => {
                                      e.target.style.textDecoration = linkStyle.textDecoration;
                                      e.target.style.color = linkStyle.color; 
                                  }}
                              >
                                  Create Book
                              </Link>
                          </li>

                      </ul>
                  </Col>
                  <Col md={4}>
                      <h5>Contact Us</h5>
                      <p style={{ padding:0, margin:0 } }>Email: {" "}
                          <a
                              onMouseOver={(e) => {
                                  e.target.style.textDecoration = linkStyleHover.textDecoration;
                                  e.target.style.color = 'lightblue';
                              }}
                              onMouseOut={(e) => {
                                  e.target.style.textDecoration = linkStyle.textDecoration;
                                  e.target.style.color = linkStyle.color;
                              }}
                          href="mailto:michaelokolo62@yahoo.com"
                          >
                              michaelokolo62@yahoo.com
                          </a>
                      </p>
                      <p style={{ padding: 0, margin: 0 }}>Phone: +44 758 779 4304</p>

                  </Col>
              </Row>
              <Row className="mt-3">
                  <Col>
                      <p>&copy; {new Date().getFullYear()} BookApp. All rights reserved.</p>
                  </Col>
              </Row>
          </Container>
      </footer>
  )
}

export default Footer;


/*
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    const footerStyle = {
        backgroundColor: '#343a40',
        color: 'white',
        padding: '20px 0',
        textAlign: 'center',
        marginTop: 'auto',
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
    };

    const linkHoverStyle = {
        textDecoration: 'underline',
    };

    return (
        <footer style={footerStyle}>
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>BookApp</h5>
                        <p>Your favorite book management app.</p>
                    </Col>
                    <Col md={4}>
                        <h5>Quick Links</h5>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            <li>
                                <a
                                    href="/"
                                    style={linkStyle}
                                    onMouseOver={(e) => (e.target.style.textDecoration = linkHoverStyle.textDecoration)}
                                    onMouseOut={(e) => (e.target.style.textDecoration = linkStyle.textDecoration)}
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/about"
                                    style={linkStyle}
                                    onMouseOver={(e) => (e.target.style.textDecoration = linkHoverStyle.textDecoration)}
                                    onMouseOut={(e) => (e.target.style.textDecoration = linkStyle.textDecoration)}
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact"
                                    style={linkStyle}
                                    onMouseOver={(e) => (e.target.style.textDecoration = linkHoverStyle.textDecoration)}
                                    onMouseOut={(e) => (e.target.style.textDecoration = linkStyle.textDecoration)}
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Contact Us</h5>
                        <p>Email: support@bookapp.com</p>
                        <p>Phone: +123 456 7890</p>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <p>&copy; {new Date().getFullYear()} BookApp. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
*/