import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SlSocialFacebook } from "react-icons/sl";
import { VscGithubAlt } from "react-icons/vsc";
import { LuInstagram } from "react-icons/lu";
import { FaFigma } from "react-icons/fa";
import { LuLinkedin } from "react-icons/lu";
import { SlSocialDribbble } from "react-icons/sl";


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
          backgroundColor: 'black',
          marginTop: 'auto',
          color: 'white',
          fontSize:'1rem',
          padding: '20px 0',
          textAlign: 'center',
            }}>
          <Container>
              <Row>
                  <Col md={3}>
                      <h5>BookApp</h5>
                      <p style={{ fontWeight: "lighter" }}>Your favorite book management app.</p>
                  </Col>
                  <Col md={3}>
                      <h5>Quick Links</h5>
                      <ul style={{ listStyleType: 'none', padding: 0}}>
                          <li style={{ fontWeight:"lighter"}}>
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
                          <li style={{ fontWeight: "lighter" }}>
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
                          <li style={{ fontWeight: "lighter" }}>
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
                  <Col md={3}>
                      <h5>Contact Us</h5>
                      <p style={{ padding: 0, margin: 0, fontWeight:"lighter"} }>Email: {" "}
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
                      <p style={{ padding: 0, margin: 0, fontWeight:"lighter"}}>Phone: +44 758 779 4304</p>

                  </Col>
                  <Col md={3} style={{ color: 'white', padding:'0rem 1rem' }}>
                      <h5>Follow Us</h5>
                      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                          <Link to='#'>
                              <SlSocialFacebook />
                          </Link>
                          <Link to='https://github.com/michaelokolo'>
                              <VscGithubAlt />
                          </Link>
                          <Link to='#'>
                              <LuInstagram />
                          </Link>
                          <Link to='#'>
                              <FaFigma />
                          </Link>
                          <Link to='https://www.linkedin.com/in/michael-okolo-b24497b2/'>
                              <LuLinkedin />
                          </Link>
                          <Link to='#'>
                              <SlSocialDribbble />
                          </Link>
                          
                      </div>
                      
                  </Col>
              </Row>
              <Row className="mt-3">
                  <Col>
                      <p style={{ fontWeight: "lighter" }}>&copy; {new Date().getFullYear()} BookApp. All rights reserved.</p>
                  </Col>
              </Row>
          </Container>
      </footer>
  )
}

export default Footer;