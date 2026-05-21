import React, { useState, useEffect, useRef } from "react";
import "../Styles/Config.css";
import n from "../assets/n.png";
import fishes from "../assets/fishes.png";

export default function Config({ 
    panelWidth, 
    setPanelWidth, 
    panelHeight, 
    setPanelHeight, 
    startDrawing 
}) {
    const [toast, setToast] = useState({ visible: false, message: "" });
    const toastTimeoutRef = useRef(null);

    const showLocalToast = (message) => {
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        setToast({ visible: true, message });
        toastTimeoutRef.current = setTimeout(() => {
            setToast({ visible: false, message: "" });
        }, 4000);
    };

    useEffect(() => {
        return () => {
            if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        };
    }, []);

    const handleValidationAndStart = () => {
        const width = parseInt(panelWidth, 10);
        const height = parseInt(panelHeight, 10);

        if (isNaN(width) || isNaN(height)) {
            showLocalToast("Please enter valid numbers for width and height!");
            return;
        }

        if (width < 1 || height < 1) {
            showLocalToast("Canvas size cannot be smaller than 1x1!");
            return;
        }

        if (width > 32 || height > 32) {
            showLocalToast("Canvas size cannot exceed a maximum limit of 32x32!");
            return;
        }

        setPanelWidth(width);
        setPanelHeight(height);
        startDrawing();
    };

    return (
        <div id="config-page">
            {toast.visible && (
                <div className="system-toaster error">
                    <div className="toast-icon">⚠</div>
                    <div className="toast-text">{toast.message}</div>
                </div>
            )}

            <div className="config-top-content">
                <h1 className="main-title">Pixello</h1>
                <br />
                <div className="setup-container">
                    <h2 className="size-label">Size:</h2>
                    
                    <div className="control-row">
                        <div className="input-group">
                            <input 
                                type="number" 
                                min="1"
                                max="32"
                                value={panelWidth}
                                onChange={(e) => setPanelWidth(e.target.value)}
                            />
                            <span>W</span>
                        </div>

                        <span className="separator">x</span>

                        <div className="input-group">
                            <input 
                                type="number" 
                                min="1"
                                max="32"
                                value={panelHeight}
                                onChange={(e) => setPanelHeight(e.target.value)}
                            />
                            <span>H</span>
                        </div>
                        <br />
                        <button onClick={handleValidationAndStart} className="draw-button">
                            DRAW!
                        </button>
                        <p className = "separator">max 32x32</p>
                    </div>
                </div>
            </div>

            {/* --- NEW: Showcase Section Container --- */}
            <div className="showcase-section">
                <h2 className="showcase-title">Pixello Showcase</h2>
                
                <div className="showcase-box">
                    
                    <div className="showcase-row">
                        <div className="showcase-card">
                            <div className="showcase-thumb-wrapper">
                                <img src={fishes} alt="Showcase 1" className="showcase-thumb" />
                            </div>
                            <h4 className="showcase-card-title">Goldfish School</h4>
                        </div>

                        <div className="showcase-card">
                            <div className="showcase-thumb-wrapper">
                                <img src={n} alt="Showcase 1" className="showcase-thumb" />
                            </div>
                            <h4 className="showcase-card-title">n</h4>
                        </div>

                        <div className="showcase-card">
                            <div className="showcase-thumb-wrapper">
                                <img src={n} alt="Showcase 1" className="showcase-thumb" />
                            </div>
                            <h4 className="showcase-card-title">n</h4>
                        </div>
                    </div>

                    

                
                </div>
            </div>
        </div>
    );
}