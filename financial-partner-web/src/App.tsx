import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { SavingJars } from './components/SavingJars';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/saving-jars" element={<SavingJars />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
