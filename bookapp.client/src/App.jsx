import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import CreateBook from './pages/CreateBook';
import Home from './pages/Home';
import About from './pages/About';
function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/create-book" element={<CreateBook />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </BrowserRouter>
    ); 
}

export default App;