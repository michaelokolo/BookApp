import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

function UpdateBook() {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: 0,
        yearPublished: 0,
        description:''
    })

    const handleChange = (e) => {
        const value = e.target.type == 'number' ? parseFloat(e.target.value) : e.target.value;
        setFormData(
            {
                ...formData,
                [e.target.id]:value
            }
        );
    }

    console.log(formData);

  return (
      <Container className="mt-5">
          <h1 className="text-center mb-5">Update Book</h1>
          <Row className="justify-content-md-center">
              <Col xs={12} md={6}>
                  <Form >
                      <Form.Group className="mb-3" controlId="title">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                              type="text"
                              placeholder="Title"
                              onChange={handleChange}
                          />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="author">
                          <Form.Label>Author</Form.Label>
                          <Form.Control
                              type="text"
                              placeholder="Author"
                              onChange={handleChange}
                              
                          />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="price">
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                              type="number"
                              placeholder="Price"
                              onChange={handleChange}
                              
                          />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="yearPublished">
                          <Form.Label>Year</Form.Label>
                          <Form.Control
                              type="number"
                              placeholder="Year"
                              onChange={handleChange}
                          />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="description">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Enter a brief description of the book"
                              onChange={handleChange}
                          />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                          Submit
                      </Button>
                  </Form>
              </Col>

          </Row>

      </Container>
  );
}

export default UpdateBook;