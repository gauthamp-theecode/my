import { Home } from "./Pages/Home/Home";
import { Cart } from "./Pages/Cart/Cart";
import { Routes, Route} from "react-router-dom";
import './App.css';
import Login from "./Login/Login";
import Register from "./Register/Register";

function App() {
  return (
    
    <Routes> 
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} /> 
      <Route path="/cart" element={<Cart />} />
    </Routes>

  );
}

export default App;

