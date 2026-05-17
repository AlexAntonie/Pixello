import React from "react";
import "./Styles/Config.css";
export default function Config({ 
    panelWidth, 
    setPanelWidth, 
    panelHeight, 
    setPanelHeight, 
    startDrawing 
}) {
    return (
        <div id="config-page">
            <h1 className="main-title">Pixello</h1>
            <br />
            <div className="setup-container">
                <h2 className="size-label">Size:</h2>
                
                <div className="control-row">
                    <div className="input-group">
                        <input 
                            type="number" 
                            value={panelWidth}
                            onChange={(e) => setPanelWidth(e.target.value)}
                        />
                        <span>W</span>
                    </div>

                    <span className="separator">x</span>

                    <div className="input-group">
                        <input 
                            type="number" 
                            value={panelHeight}
                            onChange={(e) => setPanelHeight(e.target.value)}
                        />
                        <span>H</span>
                    </div>
                    <br />
                    <button onClick={startDrawing} className="draw-button">
                        DRAW!
                    </button>
                </div>
            </div>
        </div>
    );
}