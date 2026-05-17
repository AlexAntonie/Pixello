import React from "react";
import "../Styles/Pixel.css";

export default function Pixel({ 
    index, 
    selectedColor, 
    gridColor, 
    tool, 
    hoveredPixelIndex,
    setHoveredPixelIndex,
    onPixelInteract 
}) {
    
    function handleMouseDown(e) {
        if (e.button !== 0) return;
        onPixelInteract(index, true);
    }

    function handleMouseEnter(e) {
        setHoveredPixelIndex(index);
        if (tool === "eyedropper" || tool === "bucket") return;

        if (e.buttons === 1) {
            onPixelInteract(index, true);
        }
    }

    function handleMouseLeave() {
        if (hoveredPixelIndex === index) {
            setHoveredPixelIndex(null);
        }
    }

    function handleContextMenu(e) {
        e.preventDefault();
    }

    const displayColor = (hoveredPixelIndex === index && tool !== "eyedropper" && tool !== "bucket")
        ? (selectedColor === "transparent" ? "#ffffff00" : selectedColor)
        : gridColor;

    return (
        <div
            className="pixel"
            style={{ backgroundColor: displayColor }}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onContextMenu={handleContextMenu}
        ></div>
    );
}