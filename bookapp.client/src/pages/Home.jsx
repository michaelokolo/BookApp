import { useState, useEffect } from "react";
import Spinner from '../components/Spinner';
import { FaTrashAlt } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { BsInfoCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import HeroSection from "../components/HeroSection";


function Home() {
    const [books, setBooks] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchbooks = async () => {
            setLoading(true);
            const res = await fetch('/api/books');
            if (!res.ok) {
                throw new Error(`Server responded with a ${res.status}`);
                setError(true);
                setLoading(false);
            }
            const data = await res.json();
            console.log(data);
            setBooks(data);
            setLoading(false);
        }
        fetchbooks();
    }, []);

    const handleDelete = async (id) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this book?");
        if (!userConfirmed) {
            return;
        }
        const res = await fetch(`/api/books/${id}`, {
            method: 'DELETE'
        })
        if (!res.ok) {
            throw new Error(`Could not delete book with id: ${id}`)
            console.log(`Could not delete book with id: ${id}`)
        }
            setBooks(prevBooks => prevBooks.filter(book => book.id !== id))
    }

    
    return (
        <>
            <HeroSection />
            {loading &&
                <div className="container h-100 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }} >
                    <Spinner />
                </div>}

            {!loading && !error && (

                <div className="container mb-5">
                    <h3 className="mb-3" style={{ fontSize: '1.5rem' }}>My Books({books && books.length})</h3>
                    <Row xs={1} md={3} className="g-4">
                        {books && books.map(book => (
                            <Col key={book.id}>
                                <Card className="h-100" style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Card.Img
                                        variant="top"
                                        src={book.imageUrl}
                                        alt="book image"
                                        style={{ maxHeight: '200px', objectFit: 'cover' }}
                                    />
                                    <Card.Body style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
                                        <Card.Title>{book.title}</Card.Title>
                                        <Card.Text>Author: {book.author}</Card.Text>
                                        <div className="d-flex justify-content-between mt-auto" style={{ marginTop: 'auto' }}>
                                            <Link to={`/update-book/${book.id}`}>
                                                <TiPencil
                                                    color={"green"}
                                                    style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                                                />

                                            </Link>
                                            <Link to={`/book-details/${book.id}` }>
                                                <BsInfoCircleFill
                                                    style={{fontSize:'1.5rem'} }
                                                />
                                            </Link>
                                            

                                            <FaTrashAlt
                                                color={"red"}
                                                className="ms-3"
                                                style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                                                onClick={() => handleDelete(book.id)}
                                            />

                                            
                                        </div>
                                    </Card.Body>

                                </Card>
                            </Col>
                        ))}
                    </Row>

                </div>
            )}

        </>
            
  );
}

export default Home;