import React from "react";
import { CirclePicker } from "react-color";

function SidebarPalette({ 
    palette, 
    selectedColor, 
    lastColor, 
    setColor, 
    colorInputRef, 
    handleLiveColorPreview, 
    setIsPickerOpen 
}) {
    return (
        <div className="sidebar-left">
            <CirclePicker 
                colors={palette} 
                color={selectedColor === "transparent" ? lastColor : selectedColor} 
                onChangeComplete={(color) => {
                    setColor(color.hex);
                    setLastColor(color.hex); 
                }}
                width="100%" 
                circleSize={28}
                circleSpacing={10}
            />
            <input 
                type="color" 
                ref={colorInputRef} 
                style={{ display: "none" }} 
                onInput={handleLiveColorPreview}
            />
            <button 
                className="add-color-btn" 
                onClick={() => {
                    setIsPickerOpen(true);
                    colorInputRef.current.click();
                }}
            >
                +
            </button>
        </div>
    );
}

export default SidebarPalette;