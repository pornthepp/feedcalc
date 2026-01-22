import "./UniversalButton.css"


export default function UniversalButton ({buttonLabel, type = "cancel", onClick}){

    return  (
        <div>
            <button className={`universal-button ${type}`} onClick={onClick} >
          <span className={`universal-button-label ${type}`}>{buttonLabel}</span>
        </button>
        </div>
    )
}