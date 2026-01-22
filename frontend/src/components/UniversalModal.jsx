import React,{ useState,useEffect } from 'react'
import "./UniversalModal.css"
import { createPortal } from "react-dom";
import UniversalButton from "./UniversalButton.jsx"


export default function UniversalModal ({isOpen,title,children,onConfirm,onCancel,type,shaker,doRefresh}){
    if(!isOpen) return null;

    return createPortal(
        <div className="universal-modal-overlay">
            <div className={`universal-modal-content ${shaker ? "shake-animation" : ""}`}>
                <div className="universal-modal-header">
                    <h3>{title}</h3>

                </div>
                <div className="universal-modal-body">
                    <div className="universal-modal-body-content">
                        {children}
                    </div>
                    
                </div>
                <div className="universal-modal-footer">
                    <div className="universal-modal-footer-button">
                        <UniversalButton doRefresh = {doRefresh} onClick ={onCancel} type = "cancel" buttonLabel = "ยกเลิก"/>
                        <UniversalButton doRefresh = {doRefresh} onClick ={onConfirm} type = "confirm" buttonLabel = "ยืนยัน"/>
                    </div>
                </div>
            </div>
        </div>,document.getElementById("universal-modal-root")
    )
}