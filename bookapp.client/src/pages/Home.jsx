import { useState, useEffect } from "react";
import Spinner from '../components/Spinner';
import { FaTrashAlt } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { Link } from "react-router-dom";


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
                <div className="container mt-5">
                    <h1 className="text-center">Book List</h1>
                    <table className="table table-hover table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Author</th>
                                <th scope="col">Price</th>
                                <th scope="col">Year Published</th>
                                <th scope="col">Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                books && books.map(book => (
                                    <tr key={book.id}>
                                        <th scope="row">{book.id}</th>
                                        <td>{book.title}</td>
                                        <td>{book.description}</td>
                                        <td>{book.author}</td>
                                        <td>{book.price}</td>
                                        <td>{book.yearPublished}</td>
                                        <td className="gap-3">

                                            <Link to={`/update-book/${book.id}`}>
                                                <TiPencil
                                                    color={"green"}
                                                    style={{ cursor: 'pointer' }}
                                                />

                                            </Link>
                                            
                                            <FaTrashAlt
                                                color={"red"}
                                                className="ms-3"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => handleDelete(book.id)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )}
        </main>
  );
}

export default Home;