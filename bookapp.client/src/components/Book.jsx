import { FaTrashAlt } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { BsInfoCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from "react";
import Spinner from '../components/Spinner';

function Book() {
    const [books, setBooks] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchbooks = async () => {
            setLoading(true);
            const res = await fetch('/api/books');
            if (!res.ok) {
                setError(true);
                setLoading(false);
                throw new Error(`Server responded with a ${res.status}`);
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
            console.log(`Could not delete book with id: ${id}`);
            throw new Error(`Could not delete book with id: ${id}`);
        }
        setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
    }
    const headerStyle = {
        color: '#343a40',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '4rem'
    };

    return (
        <>
            {loading &&
                <div className="container h-100 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }} >
                    <Spinner />
                </div>}

            {!loading && !error && (
                <div className="container mt-5 mb-5">
                    <h1 style={headerStyle}>Book <span style={{ color: '#ffc107', fontWeight: 'bold' }}>Collection</span></h1>
                    <h3 className="mb-3" style={{ color: '#343a40', fontWeight: 'lighter' }}>All Books ({books && books.length})</h3>
                    <p className="mb-4 lead" style={{ fontSize: '1.2rem', color: '#6c757d' }}>
                        Browse through our collection of books. Different books from different catergories here.
                    </p>
                    <Row xs={1} md={3} className="g-4">
                        {books && books.map(book => (
                            <Col key={book.id}>
                                <Card className="h-100" style={{ display: 'flex', flexDirection: 'column', border: '1px solid #dee2e6', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                    <Card.Img
                                        variant="top"
                                        src={book.imageUrl}
                                        alt="book image"
                                        style={{ maxHeight: '200px', objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                                    />
                                    <Card.Body style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <Card.Title style={{ color: '#007bff' }}>{book.title}</Card.Title>
                                        <Card.Text style={{ color: '#6c757d' }}>Author: {book.author}</Card.Text>
                                        <div className="d-flex justify-content-between mt-auto" style={{ marginTop: 'auto' }}>
                                            <Link to={`/update-book/${book.id}`}>
                                                <TiPencil
                                                    color={"green"}
                                                    style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                                                />
                                            </Link>
                                            <Link to={`/book-details/${book.id}`}>
                                                <BsInfoCircleFill
                                                    style={{ fontSize: '1.5rem', color: '#17a2b8' }}
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

export default Book;