import { useState, useEffect } from "react";
import Spinner from '../components/Spinner';
import { FaTrashAlt } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


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
        <main>
            {loading &&
                <div className="container h-100 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }} >
                    <Spinner />
                </div>}
       
            {!loading && !error && (

                <div className="container mt-5 mb-5">
                    <h1 className="mb-3">All Books({ books && books.length})</h1>
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
                                        <div className="d-flex justify-content-between mt-auto" style={{marginTop:'auto'}}>
                                            <Link to={`/update-book/${book.id}`}>
                                                <TiPencil
                                                    color={"green"}
                                                    style={{ cursor: 'pointer', fontSize:'1.5rem'}}
                                                />

                                            </Link>

                                            <FaTrashAlt
                                                color={"red"}
                                                className="ms-3"
                                                style={{ cursor: 'pointer', fontSize:'1.5rem'}}
                                                onClick={() => handleDelete(book.id)}
                                            />
                                        </div>
                                    </Card.Body>

                                </Card>
                            </Col>
                        )) }
                    </Row>

                </div>
            )}
        </main>
  );
}

export default Home;