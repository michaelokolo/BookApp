import React, { useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Form, FormControl, Button, Container, Row, Col, Alert, Stack} from 'react-bootstrap';
import { GoQuestion } from "react-icons/go";
import BookCard from '../components/BookCard';
import Spinner from '../components/Spinner';

function Search() {
    const navigate = useNavigate();
    const [sidebarStyle, setSidebarStyle] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [book, setBook] = useState([])
    const [loading, setLoading] = useState(false);



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
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }

        const fetchBooks = async () => {
            setLoading(true);
            const res = await fetch(`/api/Books/search/${searchTermFromUrl}`);
            const data = await res.json();
            setBook(data);
            setLoading(false);
            
        };
        fetchBooks();
        console.log(book);
    }, [location.search]);


    console.log(searchTerm);

    return (
        <Container fluid>
            <Row className="flex-md-row flex-column min-vh-100">
                <Col
                    md={3}
                    className="bg-light p-4 d-flex flex-column"
                    style={sidebarStyle}
                >
                    <Form onSubmit={handleSubmit} className="d-flex flex-column" style={{ gap: '1rem' }}>
                        <Form.Group as={Row} className="align-items-center">
                            
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
                <Col md={9} className="p-0 pt-md-4 pt-0 flex-grow-1 ">
                    <Stack>
                        <div className="border-bottom">
                            <h2 className="p-2">
                                Book Results:
                            </h2>
                        </div>
                        {loading &&
                            <div className="container h-100 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }} >
                                <Spinner />
                            </div>}
                        
                        {!loading && book.length === 0 &&
                            <div className="p-4 w-100">
                                <Alert variant="light" className="d-flex align-items-center">
                                    <div className="d-flex align-items-center g-2">
                                        <GoQuestion />
                                        <p className="m-0">No matches found. Try refining your search for better results.</p>
                                    </div>

                                </Alert>
                            </div>
                        }
                        {!loading && book.length !== 0 && (
                            <Row className="d-flex flex-wrap justify-content-start g-4 m-3">
                               
                                    {book.map(b => (
                                        <BookCard key={b.id} book={b} />
                                    ))}
                                
                                
                            </Row>
                        )}
                    </Stack>
                </Col>
            </Row>
        </Container>
    );
}

export default Search;