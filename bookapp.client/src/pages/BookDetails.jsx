import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {Link } from 'react-router-dom'

function BookDetails() {
    const [book, setBook] = useState({
        id: 0,
        author: '',
        description: '',
        imageUrl: '',
        price: 0,
        title: '',
        yearPublished:0,
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
                })
                
            } catch (error) {
               console.error('Error fetching book', error) 
            }
            
        };
        fetchBook();
        
    }, [params.bookId])
    console.log(book);
    return (
        <div className='mt-5 mb-5'>
            
            <Container >
                <h1 className='mb-5'>Book Details - {book.title}</h1>
                <Row>
                    <Col md={6} className='d-flex justify-content-center'>
                        <img style={{ height:'500px', objectFit:'cover' }} className='img-fluid' src={book.imageUrl} alt='book image' />
                    </Col>
                    <Col md={6} className='mt-5'>
                        <h2>{book.title}</h2>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Description:</strong> {book.description}</p>
                        <p><strong>Price:</strong> {book.price}</p>
                        <p><strong>Year Published:</strong> {book.yearPublished}</p>
                        <div>
                            <Button as={Link} to={'/'} variant="primary">Home</Button>{' '}
                            <Button as={Link} to={`/update-book/${book.id}`} variant="success">Edit details</Button>
                        </div>
              </Col>
                </Row>

            </Container>
      </div>
      
  );
}

export default BookDetails;