import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Community from '../components/Community';
import Promo from '../components/Promo';
import { AuthenticatedTemplate } from '@azure/msal-react';
import useFetchWithMsal from '../hooks/useFetchWithMsal';

function BookDetails() {
    const [book, setBook] = useState({
        id: 0,
        author: '',
        description: '',
        imageUrl: '',
        price: 0,
        title: '',
        yearPublished: 0,
    });
    const params = useParams();
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await fetch(`/api/books/${params.bookId}`);
                const data = await res.json();
                if (data.success === false) {
                    console.log(data.message);
                    return;
                }
                setBook({
                    id: data.id || 0,
                    author: data.author || '',
                    description: data.description || '',
                    imageUrl: data.imageUrl || '',
                    price: data.price || 0,
                    title: data.title || '',
                    yearPublished: data.yearPublished || 0,
                });
            } catch (error) {
                console.error('Error fetching book', error);
            }
        };
        fetchBook();
    }, [params.bookId]);
    console.log(book);
    return (
        <div className='mt-5 mb-5'>
            <Container>
                <h1 className='text-center mb-5'>Book Details - {book.title}</h1>
                <Row className='justify-content-center'>
                    <Col xs={12} md={10} lg={8}>
                        <Card className='shadow-sm'>
                            <Row>
                                <Col xs={12} md={6} className='d-flex justify-content-center align-items-center'>
                                    <img
                                        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                        className='img-fluid'
                                        src={book.imageUrl}
                                        alt='book image'
                                    />
                                </Col>
                                <Col xs={12} md={6} className='p-4'>
                                    <Card.Body>
                                        <Card.Title>{book.title}</Card.Title>
                                        <Card.Text>
                                            <strong>Author:</strong> {book.author}
                                        </Card.Text>
                                        <Card.Text style={{ textAlign: 'justify' }}>
                                            <strong>Description:</strong> {book.description}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Price:</strong> ${book.price}
                                        </Card.Text>
                                        <Card.Text>
                                            <strong>Year Published:</strong> {book.yearPublished}
                                        </Card.Text>
                                        <div className='d-flex justify-content-between'>
                                            <Button as={Link} to={'/'} variant='primary'>
                                                Home
                                            </Button>
                                            <AuthenticatedTemplate>
                                                <Button as={Link} to={`/update-book/${book.id}`} variant='success'>
                                                    Edit details
                                                </Button>
                                            </AuthenticatedTemplate>
                                           
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Community />
                <Promo />
            </Container>
        </div>
    );
}

export default BookDetails;