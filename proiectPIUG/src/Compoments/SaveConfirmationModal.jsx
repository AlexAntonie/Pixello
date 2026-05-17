import React from "react";
import "../Styles/SaveConfirmationModal.css";

export default function SaveConfirmationModal({ isOpen, onCancel, onExitWithoutSaving, onSaveAndExit }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    
                    <h3>Unsaved Changes!</h3>
                </div>
                
                <p className="modal-message">
                    There are unsaved changes made to your drawing. Not saving does not keep any changes since the last save.
                </p>

                <div className="modal-actions-column">
                    <button className="modal-btn save-exit" onClick={onSaveAndExit}>
                        Save and Exit
                    </button>
                    <button className="modal-btn discard-exit" onClick={onExitWithoutSaving}>
                        Exit Without Saving
                    </button>
                    <button className="modal-btn cancel" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}