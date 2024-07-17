import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'; 

function Header() {
  return (
      <Card>
          <Card.Header>
              <Nav variant="tabs" defaultActiveKey="/">
                  <Nav.Item>
                      <Nav.Link as={Link} to="/">Home</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link as={Link} to="/create-book">Create Book</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link as={Link} to="/about">About</Nav.Link>
                  </Nav.Item>

              </Nav>
          </Card.Header>
      </Card>
  );
}

export default Header;



