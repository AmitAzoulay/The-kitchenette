import Login from "./auth/login/Login";
import Signup from "./auth/signup/Signup";
import Chat from "./dashboard/Dashboard";
import Header from "./header/Header";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header></Header>
      
        <Routes>
          <Route path="/" element={<Login></Login>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/register" element={<Signup></Signup>} />
          <Route path="/dashboard" element={<Chat></Chat>} />
        </Routes>
    </>
  );
}

export default App;
