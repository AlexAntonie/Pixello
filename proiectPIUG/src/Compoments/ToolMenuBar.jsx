import React from "react";

function ToolMenuBar({ goBack, onSave, onExport }) {
    return (
        <div className="menu-bar">
            <button onClick={goBack} className="menu-btn">← EXIT</button>   
            <button onClick={onSave} className="menu-btn">SAVE PROJECT</button>
            <button onClick={onExport} className="menu-btn">EXPORT .PNG</button>
        </div>
    );
}

export default ToolMenuBar;