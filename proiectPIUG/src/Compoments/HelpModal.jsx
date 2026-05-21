import React, { useState } from "react";
import "../Styles/HelpModal.css";

function HelpModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>

      <button 
        className="help-trigger-btn" 
        onClick={() => setIsOpen(true)}
        aria-label="Open Help"
      >
        ?
      </button>

   
      {isOpen && (
        <div className="help-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="help-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="help-modal-close" 
              onClick={() => setIsOpen(false)}
              aria-label="Close Help"
            >
              &times;
            </button>
            <h2>Help & Instructions</h2>
            <br />
            <p>
              Welcome to Pixello! This site is split into four pages:
            </p>
            <p>            -The Main Page: Contains featured arkwork, and allows you to create a new drawing canvas.
                You can set the size to any values between 1 and 32 (inclusively), and it does not have to be square.
            </p>
            <p>            -The Canvas page: Can be accessed by setting your canvas size and clicking the "Draw!" button
                on the main page. You MUST hit the save button before closing the page in order for your drawing to be saved!
            </p>
            <p>             There are four tools at your disposal in the canvas tab - Pencil, Eraser, Color Picker, and bucket.
                They each have their associated hotkey next to them. Under the drawing canvas, you can find the undo and redo button
                (Their hotkeys are CTRL+z and CTRL+y). On the left, you can choose a color from the 18 default ones, or add more
                custom colors, up to 24. Any new colors will remove the oldest color.
            </p>
            <p>            -The Gallery tab allows you to see past artworks, and continue working on them. Every saved artwork is saved
                locally inside the browser.
            </p>
            <p>            -The settings tab which lets you change your theme and keybinds.
            </p>
            <br />
            <p>
                           In the top right, there is a color pallette button, to let you personalize the site's color scheme on the fly!
            </p>
            
          </div>
        </div>
      )}
    </>
  );
}

export default HelpModal;