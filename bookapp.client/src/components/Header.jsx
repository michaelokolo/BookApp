import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import { FcReadingEbook } from "react-icons/fc";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';




function Header() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    <FcReadingEbook style={{ fontSize: '2.5rem' }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to="/" style={{fontSize:'1.2rem'}}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/create-book" style={{ fontSize: '1.2rem' }}>Create Book</Nav.Link>
                        <Nav.Link as={Link} to="/about" style={{ fontSize: '1.2rem' }}>About</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            style={{ fontSize: '1.2rem' }}
                        />
                        <Button style={{ fontSize: '1.2rem' }} variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  );
}

export default Header;



