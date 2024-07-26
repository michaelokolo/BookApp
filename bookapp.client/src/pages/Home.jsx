import { useState,useEffect } from "react";


function Home() {
    const [books, setBooks] = useState(null);


    useEffect(() => {
        const fetchbooks = async () => {
            const res = await fetch('/api/books');
            if (!res.ok) {
                throw new Error(`Server responded with a ${res.status}`);
            }
            const data = await res.json();
            console.log(data);
            setBooks(data);
        }
        fetchbooks();
    }, []);
    
    return (
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
                    </tr>
                </thead>
                <tbody>
                    {
                        books && books.map(book => (
                            <tr key={book.id}>
                                <th  scope="row">{book.id}</th>
                                <td>{book.title}</td>
                                <td>{book.description}</td>
                                <td>{book.author}</td>
                                <td>{book.price}</td>
                                <td>{book.yearPublished}</td>
                            </tr>
                        ))
                    }
                        
                    
                    
                </tbody>
            </table>
        </div>
        
  );
}

export default Home;