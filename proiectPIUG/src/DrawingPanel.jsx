import React, { forwardRef, useState, useRef } from "react";
import "./Styles/DrawingPanel.css";
import Row from "./Row.jsx";

const DrawingPanel = forwardRef(({ width, height, selectedColor }, ref) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleWheel = (e) => {
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prev) => Math.min(Math.max(prev + delta, 0.1), 5));
  };

  const handleMouseDown = (e) => {
    if (e.button === 1) {
      e.preventDefault(); 
      setIsPanning(true);
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;

    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;

    setPosition((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  let rows = [];
  for (let i = 0; i < height; i++) {
    rows.push(<Row key={i} width={width} selectedColor={selectedColor} />);
  }

  return (
    <div 
      className="drawing-panel-container" 
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} 
    >
      <div className="canvas-backdrop">
        <div 
          id="pixels" 
          ref={ref} 
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: "center center",
            cursor: isPanning ? "grabbing" : "crosshair"
          }}
        >
          {rows}
        </div>
      </div>
    </div>
  );
});

export default DrawingPanel;