import React, { useState } from "react";
import "./Styles/Pixel.css";

export default function Pixel(props) {
    const { selectedColor } = props;

    const [pixelColor, setPixelColor] = useState("#ffffff00");
    const [oldColor, setOldColor] = useState(pixelColor);


    function handleMouseDown() {
        setPixelColor(selectedColor);
        setOldColor(selectedColor);
    }

    

    function handleMouseEnter(e) {

        if (e.buttons === 1) {
            setPixelColor(selectedColor);
            setOldColor(selectedColor);
        } else {
            setOldColor(pixelColor);
            setPixelColor(selectedColor);
        }
    }

    function handleMouseLeave() {
        setPixelColor(oldColor);
    }

    return (
        <div
            className="pixel"
            style={{ backgroundColor: pixelColor }}
            onMouseDown={handleMouseDown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        ></div>
    );
}