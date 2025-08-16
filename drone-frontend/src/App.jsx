import './App.css'
import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/dashboard';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
