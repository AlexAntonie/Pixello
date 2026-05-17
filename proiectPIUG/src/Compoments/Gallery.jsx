import React from "react";
import "../Styles/Gallery.css";

export default function Gallery({ drawings, accessDrawing }) {
  return (
    <div id="gallery-page">
      <h1 className="section-title">Your Gallery</h1>
      {drawings.length === 0 ? (
        <p className="empty-msg">No drawings found</p>
      ) : (
        <div className="gallery-grid">
          {drawings.map((art) => (
            <div key={art.id} className="gallery-card" onClick={() => accessDrawing(art.id)}>
              
    
              <div className="card-preview-container">
                {art.previewImg ? (
                  <img 
                    src={art.previewImg} 
                    alt={art.name} 
                    className="gallery-thumbnail" 
                  />
                ) : (
                  <div className="card-preview-placeholder">🖼️ (No Preview)</div>
                )}
              </div>

              <div className="card-details">
                <h3>{art.name}</h3>
                <p>{art.width} x {art.height} Grid</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}