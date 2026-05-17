import React, { useRef, useState } from "react";
import { CirclePicker } from "react-color";
import DrawingPanel from "./DrawingPanel";
import html2canvas from "html2canvas";
import "./Styles/Workspace.css";

export default function Workspace({ 
    panelWidth, panelHeight, selectedColor, setColor, goBack 
}) {
    const pixelRef = useRef();
    const [lastColor, setLastColor] = useState(selectedColor);

    const handleExport = () => {
        if(!pixelRef.current) return;

        html2canvas(pixelRef.current, { 
            backgroundColor: null,
            logging: false, 
            useCORS: true 
        }).then((canvas) => {
            const link = document.createElement("a");
            link.download = "pixel-art.png";  
            link.href = canvas.toDataURL();
            link.click();
        })
    };

  
    const setEraser = () => {
        if (selectedColor !== "transparent") {
            setLastColor(selectedColor); 
        }
        setColor("transparent");
    };

    const setPencil = () => {
        setColor(lastColor); 
    };

    return (
        <div id="workspace">
            <div className="menu-bar">
                <button onClick={goBack} className="menu-btn">← EXIT</button>   

                <button onClick={handleExport} className="menu-btn">EXPORT .PNG</button>
            </div>

            <div className="middle-menu">
                
                    <button 
                        className={`tool-btn ${selectedColor !== "transparent" ? "active" : ""}`} 
                        onClick={setPencil}
                    >
                        Pencil
                    </button>
                    <button 
                        className={`tool-btn ${selectedColor === "transparent" ? "active" : ""}`} 
                        onClick={setEraser}
                    >
                        Eraser
                    </button>
                
            </div>

            <div className="sidebar-left">
                <CirclePicker 
                    color={selectedColor === "transparent" ? lastColor : selectedColor} 
                    onChangeComplete={(color) => {
                        setColor(color.hex);
                        setLastColor(color.hex); 
                    }}
                    width="112px" 
                    circleSize={28}
                    circleSpacing={10}
                />
            </div>

            <div className="canvas-area">
                <DrawingPanel 
                    ref={pixelRef}
                    width={panelWidth} 
                    height={panelHeight} 
                    selectedColor={selectedColor}
                />
            </div>
        </div>
    );
}