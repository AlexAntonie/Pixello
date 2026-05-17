import React from "react";

function ToolSelector({ tool, setTool, setColor, lastColor, keybinds }) {
    return (
        <div className="middle-menu">
            <button 
                className={`tool-btn ${tool === "pencil" ? "active" : ""}`} 
                onClick={() => { setTool("pencil"); setColor(lastColor); }}
            >
                Pencil ({(keybinds?.pencil || "p").toUpperCase()})
            </button>
            <button 
                className={`tool-btn ${tool === "eraser" ? "active" : ""}`} 
                onClick={() => { setTool("eraser"); setColor("transparent"); }}
            >
                Eraser ({(keybinds?.eraser || "e").toUpperCase()})
            </button>
            <button 
                className={`tool-btn ${tool === "eyedropper" ? "active" : ""}`} 
                onClick={() => setTool("eyedropper")}
            >
                Color Picker ({(keybinds?.colorPicker || "i").toUpperCase()})
            </button>
            <button 
                className={`tool-btn ${tool === "bucket" ? "active" : ""}`} 
                onClick={() => setTool("bucket")}
            >
                Bucket ({(keybinds?.bucket || "b").toUpperCase()})
            </button>
        </div>
    );
}

export default ToolSelector;