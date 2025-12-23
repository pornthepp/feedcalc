
import './Content.css';
import Frame from './Frame';
import SimpleList from './SimpleList.jsx';
    
export default function Content(){
    return(
        <div className="content">
            <div className="title-container">
                <h1 className='content-title'>คำนวณวัตถุดิบ</h1>
                <h4 className='content-description'>คำนวณสูตรอาหารจากวัตถุดิบที่มีในคลัง</h4>
            </div>    
            <div className="flex-container">
                <Frame className="select-frame">
                    <p className='title obj1'>คำนวณวัตถุดิบ</p>
                    <select>
                        <option>กรุณาเลือกวัตถุดิบ</option>
                        <option>กรุณาเลือกวัตถุดิบ</option>
                        <option>กรุณาเลือกวัตถุดิบ</option>
                    </select>
                    <p className='title obj2'>ส่วนผสมที่ใช้</p>
                    <p className='underLine'></p>
                    <SimpleList  title="อัตราส่วนผสม"/>
                </Frame>
                <div className='vertical-frame'>
                    <Frame className="result-frame">
                        <p className='title obj1'>ผลการคำนวณ</p>
                    </Frame>
                    <Frame className="details-frame">
                        <p className='title obj1'>รายละเอียด</p>

                    </Frame>
                </div>
            </div>
        </div>
    );        
}