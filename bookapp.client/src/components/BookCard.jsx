import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

function BookCard({ book }) {
    return (
        <Col
            key={book.id}
            className="mb-4 d-flex justify-content-center"
            xs={12} sm={6} md={4} lg={3}
            as={Link}
            style={{ textDecoration: 'none' }}
            to={`/book-details/${book.id}`}
        >
            <Card className="h-100" style={{
                border: '1px solid #dee2e6',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                width: '100%',
                maxWidth: '220px'
            }}>
                <Card.Img
                    variant="top"
                    src={book.imageUrl}
                    alt="book image"
                    style={{
                        height: '180px',
                        objectFit: 'contain',
                        padding: '10px',
                        backgroundColor: '#f8f9fa'
                    }}
                />
                <Card.Body style={{ padding: '10px', textAlign: 'center' }}>
                    <Card.Title style={{ fontSize: '0.9rem', color: '#007bff', marginBottom: '0.3rem' }}>{book.title}</Card.Title>
                    <Card.Text style={{ fontSize: '0.8rem', color: '#6c757d', marginBottom: '0.8rem' }}>Author: {book.author}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default BookCard;








/*function BookCard() {
  return (
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
                      *<Link to={`/update-book/${book.id}`}>
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
  );
}

export default BookCard;*/