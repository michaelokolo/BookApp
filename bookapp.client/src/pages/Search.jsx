import React, { useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Form, FormControl, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { GoQuestion } from "react-icons/go";

function Search() {
    const navigate = useNavigate();
    const [sidebarStyle, setSidebarStyle] = useState({});
    const [searchTerm, setSearchTerm] = useState('');




    useEffect(() => {
        const updateSidebarStyle = () => {
            if (window.innerWidth < 768) {
                setSidebarStyle({ minHeight: 'auto', height: 'auto' });
            } else {
                setSidebarStyle({ minHeight: '100vh', height: 'auto' });
            }
        };

        updateSidebarStyle();
        window.addEventListener('resize', updateSidebarStyle);

        return () => {
            window.removeEventListener('resize', updateSidebarStyle);
        };
    }, []);

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    };

    console.log(searchTerm);

    return (
        <Container fluid>
            <Row className="flex-md-row flex-column min-vh-100">
                <Col
                    md={4}
                    className="bg-light p-4 d-flex flex-column"
                    style={sidebarStyle}
                >
                    <Form onSubmit={handleSubmit} className="d-flex flex-column" style={{ gap: '1rem' }}>
                        <Form.Group as={Row} className="align-items-center">
                            <Form.Label column xs="auto" style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                                Search Term:
                            </Form.Label>
                            <Col>
                                <FormControl
                                    type="search"
                                    placeholder="Search for books..."
                                    aria-label="Search"
                                    style={{ padding: '0.8rem' }}
                                    value={searchTerm}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Form.Group>
                        <Button variant="warning" type="submit" style={{ padding: '0.8rem 1rem' }}>
                            Search
                        </Button>
                    </Form>
                </Col>
                <Col md={8} className="p-0 pt-md-4 pt-0 flex-grow-1 ">
                    <div className="border-bottom">
                        <h2 className="p-2">
                            Book Results:
                        </h2>
                    </div>
                    <div className="p-4">
                        <Alert variant="light" className="d-flex align-items-center">
                            <div className="d-flex align-items-center g-2">
                                <GoQuestion/>
                                <p className="m-0">No matches found. Try refining your search for better results.</p>
                            </div>
                            
                        </Alert>
                    </div>
                    
                </Col>
            </Row>
        </Container>
    );
}

export default Search;