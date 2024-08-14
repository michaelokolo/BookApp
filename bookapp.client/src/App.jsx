import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import CreateBook from './pages/CreateBook';
import Home from './pages/Home';
import About from './pages/About';
import UpdateBook from './pages/UpdateBook';
import Footer from './components/Footer';
import BookDetails from './pages/BookDetails';
import Book from './components/Book'



function App() {
    return (
        <BrowserRouter>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight:'100vh' }}>
                <Header />
                <main style={{ flex:'1', paddingTop:'56px'}}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create-book" element={<CreateBook />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/update-book/:bookId" element={<UpdateBook />} />
                        <Route path="/book-details/:bookId" element={<BookDetails />} />
                        <Route path="/browse-books" element={ <Book/>} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    ); 
}

export default App;