import React, { useState } from "react";
import Config from "./Config";
import Workspace from "./Workspace";
import Gallery from "./Gallery";
import ThemeSwitcher from "./ThemeSwitcher";
import "./Styles/App.css";

function App() {
  const [theme, setTheme] = useState("night");
  const [panelWidth, setPanelWidth] = useState(16);
  const [panelHeight, setPanelHeight] = useState(16);
  const [selectedColor, setSelectedColor] = useState("#b80000");

  const [currentPage, setCurrentPage] = useState("config");

  const startDrawing = () => setCurrentPage("workspace");
  const goBack = () => setCurrentPage("config");

  return (
    <div className={`App ${theme}`}>
      <ThemeSwitcher setTheme = {setTheme} />
      {currentPage === "config" && (
        <Config
          panelWidth={panelWidth}
          setPanelWidth={setPanelWidth}
          panelHeight={panelHeight}
          setPanelHeight={setPanelHeight}
          startDrawing={startDrawing}
        />
      )}

      {currentPage === "workspace" && (
        <Workspace
          panelWidth={panelWidth}
          panelHeight={panelHeight}
          selectedColor={selectedColor}
          setColor={setSelectedColor}
          goBack={goBack}
        />
      )}
      {currentPage === "settings" && (
        <Settings />
      )

      }
    </div>
  );
}

export default App;