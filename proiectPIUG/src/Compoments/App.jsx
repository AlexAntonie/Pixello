import React, { useState, useEffect, useRef } from "react";
import Config from "./Config";
import Workspace from "./Workspace";
import Gallery from "./Gallery";
import Settings from "./Settings";
import SaveConfirmationModal from "./SaveConfirmationModal"; 
import HelpModal from "./HelpModal";
import "../Styles/App.css";
import ThemeSwitcher from "./ThemeSwitcher";

function App() {
  const [theme, setTheme] = useState("day");
  const [panelWidth, setPanelWidth] = useState(16);
  const [panelHeight, setPanelHeight] = useState(16);
  const [selectedColor, setSelectedColor] = useState("#b80000");
  const [currentPage, setCurrentPage] = useState("config");
  
  const [keybinds, setKeybinds] = useState({ pencil: "p", eraser: "e" });
  const [drawings, setDrawings] = useState([]);
  const [activeDrawingId, setActiveDrawingId] = useState(null);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingTargetPage, setPendingTargetPage] = useState(null);

  const workspaceRef = useRef();

  useEffect(() => {
    const saved = localStorage.getItem("pixello_drawings");
    if (saved) setDrawings(JSON.parse(saved));
    
    const savedTheme = localStorage.getItem("pixello_theme");
    if (savedTheme) setTheme(savedTheme);

    const savedBinds = localStorage.getItem("pixello_keybinds");
    if (savedBinds) setKeybinds(JSON.parse(savedBinds));
  }, []);

  const updateDrawingsStorage = (updatedList) => {
    setDrawings(updatedList);
    localStorage.setItem("pixello_drawings", JSON.stringify(updatedList));
  };

  const handlePageNavigationRequest = (targetPage) => {
    if (currentPage === "workspace" && hasUnsavedChanges) {
      setPendingTargetPage(targetPage);
      setIsModalOpen(true);
    } else {
      setCurrentPage(targetPage);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setPendingTargetPage(null);
  };

  const handleModalExitWithoutSaving = () => {
    setHasUnsavedChanges(false); 
    setIsModalOpen(false);
    if (pendingTargetPage) {
      setCurrentPage(pendingTargetPage);
      setPendingTargetPage(null);
    }
  };

  const handleModalSaveAndExit = () => {
    if (workspaceRef.current) {
      workspaceRef.current.triggerExternalSave(() => {
        setHasUnsavedChanges(false);
        setIsModalOpen(false);
        if (pendingTargetPage) {
          setCurrentPage(pendingTargetPage);
          setPendingTargetPage(null);
        }
      });
    }
  };

  const accessDrawing = (id) => {
    const updated = drawings.map(d => {
      if (d.id === id) {
        return { ...d, accessCount: (d.accessCount || 0) + 1, lastAccessed: Date.now() };
      }
      return d;
    });
    
    updated.sort((a, b) => b.lastAccessed - a.lastAccessed);
    updateDrawingsStorage(updated);
    
    const selected = updated.find(d => d.id === id);
    setPanelWidth(selected.width);
    setPanelHeight(selected.height);
    setActiveDrawingId(id);
    setCurrentPage("workspace");
  };

  return (
    <div className={`App ${theme}`}>
      <SaveConfirmationModal 
        isOpen={isModalOpen}
        onCancel={handleModalCancel}
        onExitWithoutSaving={handleModalExitWithoutSaving}
        onSaveAndExit={handleModalSaveAndExit}
      />

      <nav className="global-nav">
        <button 
          className={currentPage === "config" ? "active-nav" : ""} 
          onClick={() => handlePageNavigationRequest("config")}
        >
          Main Page
        </button>
        <button 
          className={currentPage === "gallery" ? "active-nav" : ""} 
          onClick={() => handlePageNavigationRequest("gallery")}
        >
          Gallery
        </button>
        <button 
          className={currentPage === "settings" ? "active-nav" : ""} 
          onClick={() => handlePageNavigationRequest("settings")}
        >
          Settings
        </button>
      </nav>

      <ThemeSwitcher setTheme={setTheme} /> 

      {currentPage === "config" && (
        <Config
          panelWidth={panelWidth}
          setPanelWidth={setPanelWidth}
          panelHeight={panelHeight}
          setPanelHeight={setPanelHeight}
          startDrawing={() => {
            setActiveDrawingId(null); 
            setCurrentPage("workspace");
          }}
        />
      )}

      {currentPage === "workspace" && (
        <Workspace
          ref={workspaceRef}
          panelWidth={panelWidth}
          panelHeight={panelHeight}
          selectedColor={selectedColor}
          setColor={setSelectedColor}
          goBack={() => handlePageNavigationRequest("config")}
          activeDrawingId={activeDrawingId}
          setActiveDrawingId={setActiveDrawingId}
          drawings={drawings}
          updateDrawingsStorage={updateDrawingsStorage}
          keybinds={keybinds}
          setHasUnsavedChanges={setHasUnsavedChanges}
        />
      )}

      {currentPage === "gallery" && (
        <Gallery drawings={drawings} accessDrawing={accessDrawing} />
      )}

      {currentPage === "settings" && (
        <Settings 
          theme={theme} 
          setTheme={(t) => { setTheme(t); localStorage.setItem("pixello_theme", t); }}
          keybinds={keybinds}
          setKeybinds={(k) => { setKeybinds(k); localStorage.setItem("pixello_keybinds", JSON.stringify(k)); }}
        />
      )}

      
      <HelpModal />
    </div>
  );
}

export default App;