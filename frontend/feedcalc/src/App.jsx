//import "./App.css"

import Calculate from "./pages/Calculate"; 
import History from "./pages/History";
import Stock from "./pages/Stock";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App(){
  return (
    <Router>
          <Routes>
            <Route path="/" element={<Calculate/>} />
            <Route path="/history" element={<History />} />
            <Route path="/stock" element={<Stock />} />
          </Routes>
    </Router>
  );
}
export default App;