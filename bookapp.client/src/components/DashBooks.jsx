import { Table,Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';


function DashBooks() {
    const [books, setBooks] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    

    useEffect(() => {
        const fetchbooks = async () => {
            try {
                const res = await fetch('/api/books');
                const data = await res.json();
                setBooks(data);

            } catch (error) {
                console.error('Error fetching books', error);
            }
        }
        fetchbooks();

    }, []);

    const handleDelete = async () => {
        try {
            await fetch(`/api/books/${selectedBook.id}`, { method: 'DELETE' });
            setBooks(books.filter(book => book.id !== selectedBook.id));
            setModalShow(false);
        } catch (error) {
            console.error("Error deleting book", error);
        }
        

    }

  return (
      <div>
          <h2>Manage Books:</h2>
          <Table responsive className="mt-2">
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Book Image</th>
                      <th>Book Title</th>
                      <th>Author</th>
                      <th>Delete</th>
                      <th>Edit</th>
                  </tr>
              </thead>
              <tbody>
                  {books && books.map((book, index) => (
                      <tr key={book.id}>
                          <td>{index + 1}</td>
                          <td>
                              <Link to={`/book-details/${book.id}` }>
                                  <img src={book.imageUrl} style={{ width: "100px", height: "100px" }} alt={book.title} />
                              </Link>
                              
                          </td>
                          <td>
                              <Link to={`/book-details/${book.id}`}>
                                  {book.title}
                              </Link>
                              
                          </td>
                          <td>{book.author}</td>
                          <td>
                              <Button variant="danger" className="me-2" onClick={() => { setSelectedBook(book); setModalShow(true) }}>Delete</Button>
                          </td>
                          <td>
                              <Button as={Link} to={`/update-book/${book.id}`} variant="warning">Edit</Button>
                          </td>
                          
                      </tr>
                  ))}
                  
              </tbody>
          </Table>
          {selectedBook && (
              <DeleteModal
                  show={modalShow}
                  handleClose={() => setModalShow(false)}
                  handleDelete={handleDelete}
                  bookTitle={selectedBook.title}
              />
          )}
      </div>
  );
}

export default DashBooks;