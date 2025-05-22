

import Router from "./Router";
import { AuthContextProvider } from "./context/AuthContext";
import axios from 'axios';

axios.defaults.withCredentials = true

function App() {
  return (
    <>
      <Router>
      </Router>
    </>
  );
}

export default App;
