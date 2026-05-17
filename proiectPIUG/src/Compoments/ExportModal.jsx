import React, { useState, useEffect } from "react";
import "../Styles/SaveNameModal.css"; 

function ExportModal({ isOpen, onClose, onConfirm, defaultName }) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    if (isOpen) {
      setInputValue(defaultName || "");
      setError("");
    }
  }, [isOpen, defaultName]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();

    if (trimmedValue.length < 3) {
      setError("The filename must be at least 3 characters long!");
      return;
    }


    const validFormat = /^[a-zA-Z0-9_-]+$/;
    if (!validFormat.test(trimmedValue)) {
      setError("No spaces or special characters allowed!");
      return;
    }

    onConfirm(trimmedValue);
  };

  return (
    <div className="save-modal-overlay">
      <div className="save-modal-content">
        <h3>Export Artwork</h3>
        <p style={{ fontSize: "0.85rem", margin: "-8px 0 12px 0", opacity: 0.8 }}>
          Name your file. Only letters, numbers, hyphens, and underscores are allowed.
        </p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={`save-modal-input ${error ? "input-error" : ""}`}
            placeholder="filename"
            value={inputValue}
            maxLength={24}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (error) setError("");
            }}
            autoFocus
          />
          
          {error && <p className="save-modal-error-msg">{error}</p>}
          
          <div className="save-modal-actions">
            <button type="button" className="save-btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn-confirm">
              Export PNG
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExportModal;