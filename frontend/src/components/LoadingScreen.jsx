// LoadingScreen.jsx
import React, { useEffect, useState } from 'react';
import './LoadingScreen.css'; 

export default function({isLoading,delay=300}){
    const[showUi,setShowUi]=useState(false);
    useEffect(()=>{
        let timer;
        //เมื่อ isLoading == true ให้ delay 300ms แล้วโชว์
        if(isLoading){
            timer=setTimeout(()=>setShowUi(true),delay);
        }else{
            setShowUi(false);
        }
        return ()=> clearTimeout(timer);
    },[isLoading,delay]);

    if (!showUi || !isLoading) {
        return null;
    }

    return(
        <div className="loading-overlay">
            <img className="loading-logo" src='images/pig_loading.gif'></img>
            <div className="loading-text">
                <h2>Connecting to server...</h2>
                <p>On the free tier server, this may take about 30–60 seconds.</p>
            </div>
        </div>
    );
}   
