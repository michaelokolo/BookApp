import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'


function CreateBook() {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: 0,
        description: '',
        yearPublished: 0,
        imageUrl: ''
    });

    const [imageFile, setImageFile] = useState(null);

    const handleChange = (e) => {
        const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
        setFormData({
            ...formData,
            [e.target.id]: value,
        });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    }

    


    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = ''
        if (imageFile) {
            const formData = new FormData();
            formData.append('file', imageFile);

            const res = await fetch('/api/books/upload', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) {
                throw new Error(`Server responded with status ${res.status}`);
            }

            const data = await res.json();
            imageUrl = data.url;
        }

        const bookData = {
            ...formData,
            imageUrl
        };



        const res = await fetch('/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData)
        });

        if (!res.ok) {
            throw new Error(`Server responded with status ${res.status}`);
        }

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await res.json();
            // Handle the data from the response
            // Redirect to the created book to avoid overposting
        } else {
            throw new Error("Received non-JSON response from the server");
        }
    };
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="author">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Author"
                                value={formData.author}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="yearPublished">
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Year"
                                value={formData.yearPublished}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter a brief description of the book"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="image">
                            <Form.Label>Book Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleFileChange}
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

export default CreateBook;


