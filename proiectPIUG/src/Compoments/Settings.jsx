import React, { useState } from "react";
import "../Styles/Settings.css";

export default function Settings({ theme, setTheme, keybinds, setKeybinds }) {
  const themes = ["day", "night", "green", "blue", "pink"];
  const [listeningFor, setListeningFor] = useState(null);

  const DEFAULT_KEYBINDS = {
    pencil: "p",
    eraser: "e",
    colorPicker: "i",
    bucket: "b"
  };

  const captureKey = (action, e) => {
    e.preventDefault();
    const updated = { ...keybinds, [action]: e.key.toLowerCase() };
    setKeybinds(updated);
    setListeningFor(null);
  };

  const resetToDefault = (action) => {
    const updated = { ...keybinds, [action]: DEFAULT_KEYBINDS[action] };
    setKeybinds(updated);
  };

  return (
    <div id="settings-page">
      <h2>Settings</h2>
      
      <div className="settings-section">
        <h3>Themes</h3>
        <div className="theme-selection-row">
          {themes.map(t => (
            <button 
              key={t} 
              className={`theme-pick-btn ${theme === t ? "active-theme" : ""}`}
              onClick={() => setTheme(t)}
              title={t}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h3>Hotkey Config</h3>
        
        <div className="keybind-row">
          <span>Pencil Tool:</span>
          <div className="keybind-actions">
            <button className="bind-btn" onClick={() => setListeningFor("pencil")}>
              {listeningFor === "pencil" ? "Press any key..." : (keybinds.pencil || DEFAULT_KEYBINDS.pencil).toUpperCase()}
            </button>
            <button className="reset-btn" onClick={() => resetToDefault("pencil")} title="Reset to default">⟲</button>
          </div>
          {listeningFor === "pencil" && <input autoFocus onKeyDown={(e) => captureKey("pencil", e)} className="hidden-key-input"/>}
        </div>

        <div className="keybind-row">
          <span>Eraser Tool:</span>
          <div className="keybind-actions">
            <button className="bind-btn" onClick={() => setListeningFor("eraser")}>
              {listeningFor === "eraser" ? "Press any key..." : (keybinds.eraser || DEFAULT_KEYBINDS.eraser).toUpperCase()}
            </button>
            <button className="reset-btn" onClick={() => resetToDefault("eraser")} title="Reset to default">⟲</button>
          </div>
          {listeningFor === "eraser" && <input autoFocus onKeyDown={(e) => captureKey("eraser", e)} className="hidden-key-input"/>}
        </div>

        <div className="keybind-row">
          <span>Color Picker:</span>
          <div className="keybind-actions">
            <button className="bind-btn" onClick={() => setListeningFor("colorPicker")}>
              {listeningFor === "colorPicker" ? "Press any key..." : (keybinds.colorPicker || DEFAULT_KEYBINDS.colorPicker).toUpperCase()}
            </button>
            <button className="reset-btn" onClick={() => resetToDefault("colorPicker")} title="Reset to default">⟲</button>
          </div>
          {listeningFor === "colorPicker" && <input autoFocus onKeyDown={(e) => captureKey("colorPicker", e)} className="hidden-key-input"/>}
        </div>

        <div className="keybind-row">
          <span>Bucket:</span>
          <div className="keybind-actions">
            <button className="bind-btn" onClick={() => setListeningFor("bucket")}>
              {listeningFor === "bucket" ? "Press any key..." : (keybinds.bucket || DEFAULT_KEYBINDS.bucket).toUpperCase()}
            </button>
            <button className="reset-btn" onClick={() => resetToDefault("bucket")} title="Reset to default">⟲</button>
          </div>
          {listeningFor === "bucket" && <input autoFocus onKeyDown={(b) => captureKey("bucket", b)} className="hidden-key-input"/>}
        </div>

        <div className="keybind-row static-hotkey">
          <span>Undo Action:</span>
          <div className="keybind-actions">
            <button className="bind-btn" disabled>CTRL + Z</button>
          </div>
        </div>

        <div className="keybind-row static-hotkey">
          <span>Redo Action:</span>
          <div className="keybind-actions">
            <button className="bind-btn" disabled>CTRL + Y</button>
          </div>
        </div>
      </div>
    </div>
  );
}