import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom'
import { FcReadingEbook } from "react-icons/fc";
import { Nav, Form, Navbar, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';




function Header() {
    const { instance, inProgress } = useMsal();
    let activeAccount;

    if (instance) {
        activeAccount = instance.getActiveAccount();
    }

    const handleLoginPopup = () => {
        instance.loginPopup({
            ...loginRequest,
            redirectUri: 'http://localhost:5173',
        }).catch((error) => console.log(error));
    };

    const handleLoginRedirect = () => {
        instance.loginRedirect(loginRequest).catch((error) => console.log(error));
    };
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
                    <AuthenticatedTemplate>
                    <p>I am working</p>
                    </AuthenticatedTemplate>
                    <UnauthenticatedTemplate>
                        <div className="collapse navbar-collapse justify-content-end">
                            <DropdownButton variant="secondary" className="ml-auto" drop="start" title="Sign In">
                                <Dropdown.Item as="button" onClick={handleLoginPopup}>
                                    Sign in using Popup
                                </Dropdown.Item>
                                <Dropdown.Item as="button" onClick={handleLoginRedirect}>
                                    Sign in using Redirect
                                </Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </UnauthenticatedTemplate>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  );
}

export default Header;



