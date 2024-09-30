import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import CreateBook from './pages/CreateBook';
import Home from './pages/Home';
import About from './pages/About';
import UpdateBook from './pages/UpdateBook';
import Footer from './components/Footer';
import BookDetails from './pages/BookDetails';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';
import Manage from './pages/Manage';


function App() {
    return (
        <BrowserRouter>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight:'100vh' }}>
                <Header />
                <main style={{ flex: '1', paddingTop: '56px' }}>
                    <ScrollToTop />
                    <Routes>
                        
                        <Route path="/" element={<Home />} />
                        <Route path="/create-book" element={<CreateBook />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/update-book/:bookId" element={<UpdateBook />} />
                        <Route path="/book-details/:bookId" element={<BookDetails />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/manage" element={<Manage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    ); 
}

export default App;