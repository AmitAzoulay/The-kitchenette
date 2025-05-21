
import Register from "./components/auth/Register";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Register></Register>} />
        </Routes>
    </>
  );
}

export default App;
