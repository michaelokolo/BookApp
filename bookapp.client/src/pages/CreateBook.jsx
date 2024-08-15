import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

function CreateBook() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: 0,
        description: '',
        yearPublished: 0,
        imageUrl: '',
    });

    const [imageFile, setImageFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [createBookError, setCreateBookError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
        setFormData({
            ...formData,
            [e.target.id]: value,
        });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleImageSubmit = async () => {
        setUploading(true);
        let imageUrl = '';
        try {
            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);

                const res = await fetch('/api/books/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!res.ok) {
                    throw new Error(`Server responded with a status ${res.status}`);
                }
                const data = await res.json();
                imageUrl = data.url;
                setFormData((preFormData) => ({
                    ...preFormData,
                    imageUrl,
                }));
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.imageUrl) {
            setCreateBookError('Please upload an image first');
            return;
        }
        try {
            setLoading(true);
            const res = await fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!res.ok) {
                throw new Error(`Server responded with a ${res.status}`);
            }
            const data = await res.json();
            navigate(`/book-details/${data.id}`);
        } catch (error) {
            console.error('Error during fetch', error);
            setCreateBookError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5">
            <h1 className="text-center mb-5">Create Book</h1>
            <Row className="justify-content-md-center">
                <Col xs={12} md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
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

                                <Form.Group className="mb-3" controlId="imageUrl">
                                    <Form.Label>Upload book image (max 200 KB)</Form.Label>
                                    <div className="input-group">
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                        <Button
                                            type="button"
                                            disabled={uploading}
                                            variant="outline-success"
                                            className="input-group-append"
                                            onClick={handleImageSubmit}
                                        >
                                            {uploading ? (
                                                <>
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />{' '}
                                                    Uploading...
                                                </>
                                            ) : (
                                                'Upload'
                                            )}
                                        </Button>
                                    </div>
                                    {error && <p className="text-danger mt-2">{error}</p>}
                                    {formData.imageUrl && (
                                        <img
                                            className="mt-3"
                                            width={100}
                                            src={formData.imageUrl}
                                            alt="book image"
                                        />
                                    )}
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    {loading ? (
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />{' '}
                                            Creating...
                                        </>
                                    ) : (
                                        'Create Book'
                                    )}
                                </Button>
                                {createBookError && <p className="text-danger mt-3">{createBookError}</p>}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CreateBook;