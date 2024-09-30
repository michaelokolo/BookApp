import { Table,Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function DashBooks() {
    const [books, setBooks] = useState(null);

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
    console.log(books);
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
                  {books && books.map(book => (
                      <tr>
                          <td>1</td>
                          <td><img src={book.imageUrl} style={{width: "100px", height: "100px"}} /></td>
                          <td>{book.title}</td>
                          <td>{book.author}</td>
                          <Button variant="danger">Delete</Button>
                          <Button variant="warning">Edit</Button>
                      </tr>
                  ))}
                  
              </tbody>
          </Table>
      </div>
  );
}

export default DashBooks;