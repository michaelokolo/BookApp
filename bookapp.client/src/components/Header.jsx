import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { FcReadingEbook } from "react-icons/fc";
import { Nav, Navbar, Dropdown, DropdownButton } from 'react-bootstrap';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';

function Header() {
    const { instance } = useMsal();
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

    const fixedHeader = {
        zIndex: '1000',
        top: '0',
        width: '100%',
        position: 'fixed',
        borderBottom: '1px solid gray',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    };

    const navLinkStyle = {
        fontSize: '1.1rem',
        marginRight: '1rem',
        color: 'black',
        transition: 'color 0.3s'
    };

    const navLinkHoverStyle = {
        color: '#007bff' 
    };

    return (
        <Navbar expand="lg" style={fixedHeader}>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <FcReadingEbook style={{ fontSize: '2.5rem' }} />
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'black', marginLeft: '0.5rem' }}>BookApp</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
                        <Nav.Link
                            as={Link}
                            to="/"
                            style={navLinkStyle}
                            onMouseOver={(e) => Object.assign(e.target.style, navLinkHoverStyle)}
                            onMouseOut={(e) => Object.assign(e.target.style, navLinkStyle)}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/about"
                            style={navLinkStyle}
                            onMouseOver={(e) => Object.assign(e.target.style, navLinkHoverStyle)}
                            onMouseOut={(e) => Object.assign(e.target.style, navLinkStyle)}
                        >
                            About
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/manage"
                            style={navLinkStyle}
                            onMouseOver={(e) => Object.assign(e.target.style, navLinkHoverStyle)}
                            onMouseOut={(e) => Object.assign(e.target.style, navLinkStyle)}
                        >
                            Manage
                        </Nav.Link>
                    </Nav>

                    <AuthenticatedTemplate>
                        <p className="mb-0">Welcome, {activeAccount?.name}</p>
                    </AuthenticatedTemplate>
                    <UnauthenticatedTemplate>
                        <Nav className="ms-auto">
                            <DropdownButton variant="warning" className="ml-auto" drop="start" title="Sign In">
                                <Dropdown.Item as="button" onClick={handleLoginPopup}>
                                    Sign in using Popup
                                </Dropdown.Item>
                                <Dropdown.Item as="button" onClick={handleLoginRedirect}>
                                    Sign in using Redirect
                                </Dropdown.Item>
                            </DropdownButton>
                        </Nav>
                    </UnauthenticatedTemplate>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;