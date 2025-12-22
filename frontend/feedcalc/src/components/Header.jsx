import './Header.css';
import { FaBoxes,FaCalculator } from "react-icons/fa";
import { MdOutlineHistory} from "react-icons/md";
function Header(){
    return(
        <div className="header">
            <div className="banner">
                <img className="logo" src='images/pig_128.png'></img>
                <div className='banner-grp'> 
                    <h1 className="header-title" >FeedCalc</h1>
                    <h4 className="header-description">โปรแกรมคำนวณสูตรอาหารสุกร - จัดการวัตถุดิบ</h4>
                </div>
                <div className="button-grp">
                    <button><FaCalculator/>{' '}Material Calculate</button>
                    <button><FaBoxes/>{' '}Stock Management</button>
                    <button><MdOutlineHistory/>{' '}History</button>
                </div>
            </div>
        </div>
    );
}
export default  Header;
