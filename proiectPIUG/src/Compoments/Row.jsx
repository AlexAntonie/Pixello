import React from "react";
import "../Styles/Row.css";
import Pixel from "./Pixel.jsx";

export default function Row({ 
    rowIndex, 
    width, 
    selectedColor, 
    grid, 
    tool, 
    hoveredPixelIndex,
    setHoveredPixelIndex,
    onPixelInteract 
}) {
    let pixels = [];

    for (let i = 0; i < width; i++) {
        const globalIndex = rowIndex * width + i;
        const pixelColor = grid && grid[globalIndex] ? grid[globalIndex] : "#ffffff00";
        
        pixels.push(
            <Pixel
                key={i}
                index={globalIndex}
                selectedColor={selectedColor}
                gridColor={pixelColor}
                tool={tool}
                hoveredPixelIndex={hoveredPixelIndex}
                setHoveredPixelIndex={setHoveredPixelIndex}
                onPixelInteract={onPixelInteract}
            />
        );
    }

    return <div className="row">{pixels}</div>;
}