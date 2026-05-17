import React, { useState } from "react";
import "../Styles/SaveNameModal.css";

function SaveNameModal({ isOpen, onClose, onConfirm }) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();

    if (trimmedValue.length < 3) {
      setError("The name must be at least 3 characters long!");
      return;
    }


    onConfirm(trimmedValue);
    setInputValue("");
    setError("");
  };

  const handleCancel = () => {
    setInputValue("");
    setError("");
    onClose();
  };

  return (
    <div className="save-modal-overlay">
      <div className="save-modal-content">
        <h3>Name Your Creation</h3>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={`save-modal-input ${error ? "input-error" : ""}`}
            placeholder="Enter project name..."
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
            <button type="button" className="save-btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="save-btn-confirm">
              Confirm Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SaveNameModal;