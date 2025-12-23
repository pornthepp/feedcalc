import Header from "./components/Header";
import "./App.css"
import Content from "./components/Content";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Calculate = () => <h2>หน้าคำนวณ (Calculate)</h2>;
const History = () => <h2>หน้าประวัติ (History)</h2>;
const Stock = () => <h2>หน้าคลังสินค้า (Stock)</h2>;
 function App(){
return (
    <Router>
      <div>
        {/* ส่วนของเมนู */}
        <nav style={{ padding: '10px', background: '#eee' }}>
          <Link to="/">หน้าแรก</Link> | 
          <Link to="/history">ประวัติ</Link> | 
          <Link to="/stock">สต็อก</Link>
        </nav>

        {/* ส่วนที่เนื้อหาจะเปลี่ยนไปตาม URL */}
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Calculate />} />
            <Route path="/history" element={<History />} />
            <Route path="/stock" element={<Stock />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;