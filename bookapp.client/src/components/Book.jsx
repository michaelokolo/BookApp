import Row from 'react-bootstrap/Row';
import { useState, useEffect } from "react";
import Spinner from '../components/Spinner';
import BookCard from '../components/BookCard';

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

    

    const headerStyle = {
        color: '#343a40',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '2rem'
    };

    return (
        <>
            {loading &&
                <div className="container h-100 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }} >
                    <Spinner />
                </div>}

            {!loading && !error && (
                <div className="container mt-4 mb-4">
                    <h1 style={headerStyle}>Book <span style={{ color: '#ffc107', fontWeight: 'bold' }}>Collection</span></h1>
                    <div className="text-center mb-4">
                        <p className="lead" style={{ fontSize: '1rem', color: '#6c757d', margin: 0 }}>
                            Browse through our collection of books. Different books from different categories here.
                        </p>
                    </div>
                    <Row xs={1} md={3} className="g-4">
                        {books && books.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </Row>
                </div>
            )}
        </>
    );
}

export default Book;