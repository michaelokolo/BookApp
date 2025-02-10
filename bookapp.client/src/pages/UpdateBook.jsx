import { useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchWithMsal from '../hooks/useFetchWithMsal';
import { protectedResources } from "../authConfig";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";
import {InteractionType } from '@azure/msal-browser'


function UpdateBook() {
    const { instance } = useMsal();
    const params = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: 0,
        title: '',
        author: '',
        price: 0,
        yearPublished: 0,
        description: ''
    });

    /*const { error, execute } = useFetchWithMsal({
        scopes: protectedResources.apibooks.scopes.write,
    });*/

    

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await fetch(`/api/books/${params.bookId}`);
                if (!res.ok) {
                    throw new Error(`Server responded with a status code of ${res.status}`);
                }
                const data = await res.json();
                setFormData({
                    id: data.id,
                    title: data.title || '',
                    author: data.author || '',
                    price: data.price || 0,
                    yearPublished: data.yearPublished || 0,
                    description: data.description || '',
                });
            } catch (error) {
                console.error(error);
            }
        };

        /** */

        const { result, error: msalError } = useMsalAuthentication(InteractionType.Popup, {
            scopes: protectedResources.apibooks.scopes.write,
            account: instance.getActiveAccount(),
            redirectUri: '/'
        });
        console.log(instance)



        fetchBook();
    }, [params.bookId]);

    const handleChange = (e) => {
        const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
        setFormData({
            ...formData,
            [e.target.id]: value
        });
    };

    /*const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const data = await execute("PUT", `/api/books/${formData.id}`, formData);
            const 
            navigate(`/book-details/${formData.id}`);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };*/

    const handleUpdate = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/books/${formData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!res.ok) {
            return `Server responded with a status code of ${res.status}`;
        }
        const data = await res.json();
        navigate(`/book-details/${formData.id}`);
        console.log(data);
    };

    return (
        <Container className="mt-5 mb-5">
            <h1 className="text-center mb-5">Update Book</h1>
            <Row className="justify-content-md-center">
                <Col xs={12} md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Form onSubmit={handleUpdate}>
                                <Form.Group className="mb-3" controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Title"
                                        onChange={handleChange}
                                        value={formData.title}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="author">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Author"
                                        onChange={handleChange}
                                        value={formData.author}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Price"
                                        onChange={handleChange}
                                        value={formData.price}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="yearPublished">
                                    <Form.Label>Year</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Year"
                                        onChange={handleChange}
                                        value={formData.yearPublished}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter a brief description of the book"
                                        onChange={handleChange}
                                        value={formData.description}
                                    />
                                </Form.Group>
                                <Button type="submit" className="w-100" variant="warning" style={{ padding: '0.8rem 1rem' }}>
                                    Update
                                </Button>
                            </Form>
                           
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default UpdateBook;