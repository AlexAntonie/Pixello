import React, {useState} from "react";
import "./Styles/Editor.css"
import {CirclePicker} from "react-color";
import DrawingPanel from "./DrawingPanel"

export default function Editor(){
    const[panelWidth, setPanelWidth] = useState(16);
    const[panelHeight, setPanelHeight] = useState(16);
    const[hideOptions,setHideOptions] = useState(false);
    const[hideDrawingPanel, setHideDrawingPanel] = useState(true);
    const[buttonText, setButtonText] = useState("Start Drawing");
    const[selectedColor, setColor] = useState("#b80000");

    function initializeDrawingPanel(){
        setHideOptions(!hideOptions);
        setHideDrawingPanel(!hideDrawingPanel);

        buttonText==="Start Drawing" ? setButtonText("Exit") : setButtonText("Start Drawing");
    }

    function changeColor(color){
        setColor(color.hex);
    }

    return <div id = "editor">
        <h1>Pixel Editor</h1>
        {hideDrawingPanel && <h2>Size:</h2>}

        {hideDrawingPanel && (<div id="options">
            <div className="option">
                <input 
                type="number" 
                className="panelInput" 
                defaultValue={panelWidth}
                onChange={(e) => setPanelWidth(e.target.value)}
                />
                <span>Width</span>
            </div>
        
            <div className="option">
                <input 
                type="number" 
                className="panelInput" 
                defaultValue={panelHeight}
                onChange={(e) => setPanelHeight(e.target.value)}
                />
                <span>Height</span>
            </div>
            
        </div>)}
        

        {!hideDrawingPanel && <CirclePicker color={selectedColor} onChangeComplete={changeColor}/>}

        {!hideDrawingPanel && <DrawingPanel width={panelWidth} height= {panelHeight} selectedColor={selectedColor}/>}

        <button onClick={initializeDrawingPanel} className="button">
            {buttonText}
        </button>
    </div>
    
}