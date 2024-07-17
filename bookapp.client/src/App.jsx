import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateBook from './pages/CreateBook';
import Home from './pages/Home';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/CreateBook" element={<CreateBook/> }/>
            </Routes>
        </BrowserRouter>
    ); 
}

export default App;