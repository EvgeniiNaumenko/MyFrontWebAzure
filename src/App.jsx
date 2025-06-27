import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './views/Layout/Layout';
import Signup from './views/Signup/Signup';
import Auth from './views/Auth/Auth';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Auth />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
