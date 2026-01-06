import './Header.css';
import { FaBoxes,FaCalculator } from "react-icons/fa";
import { MdOutlineHistory} from "react-icons/md";
import { useNavigate } from 'react-router-dom';


function Header(prop){
    const navigate = useNavigate();
    const page = prop.page;
    
    const useStyle1 = page === "calculate" ? { borderBottom: '5px solid #afcbf6' } : {};
    const useStyle2 = page === "stock"     ? { borderBottom: '5px solid #afcbf6' } : {};
    const useStyle3 = page === "history"   ? { borderBottom: '5px solid #afcbf6' } : {};

    return(
        <div className="header">
             <div className="banner">
                 <img className="logo" src='images/pig_128.png'></img>
                <div className='banner-grp'> 
                    <h1 className="header-title" >FeedCalc</h1>
                    <h4 className="header-description">โปรแกรมคำนวณสูตรอาหารสุกร - จัดการวัตถุดิบ</h4>
                </div>
                <div className="button-grp">
                    <button style={useStyle1} onClick={()=>navigate("/")}> <FaCalculator/> {' '}คำนวณสูตรอาหาร </button>
                    <button style={useStyle2} onClick={()=>navigate("/Stock")}><FaBoxes/>{' '}จัดการวัตถุดิบ</button>
                    <button style={useStyle3} onClick={()=>navigate("/History")}><MdOutlineHistory/>{' '}ประวัติการผลิต</button>
                </div> 
            </div> 
        </div>
    );
}
export default  Header;
