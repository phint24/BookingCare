import './assets/styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/HomePage/Home';
import Login from './components/Auth/Login';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
