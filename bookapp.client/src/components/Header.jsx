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

    const fixedHeader = {
        zIndex: '1000',
        top: '0',
        width: '100%',
        position: 'fixed'
    }
    return (
        <Navbar expand="lg" className='bg-white' style={{ borderBottom: '1px solid gray ', ...fixedHeader}}>
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    <FcReadingEbook style={{ fontSize: '2.5rem' }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="ms-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to="/" style={{ fontSize: '1.1rem', marginRight:'1rem', color:'black' }}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/about" style={{ fontSize: '1.1rem', marginRight: '1rem', color: 'black' }}>About</Nav.Link>
                        <Nav.Link as={Link} to="/" style={{ fontSize: '1.1rem', marginRight: '1rem', color: 'black' }}>Manage</Nav.Link>
                        
                    </Nav>

                    <AuthenticatedTemplate>
                        <p>I am working</p>
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










   


