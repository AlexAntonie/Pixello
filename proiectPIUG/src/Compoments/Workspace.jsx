import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef } from "react";
import html2canvas from "html2canvas";


import DrawingPanel from "./DrawingPanel.jsx";
import SaveNameModal from "./SaveNameModal.jsx";
import ExportModal from "./ExportModal.jsx"; 
import ToolMenuBar from "./ToolMenuBar.jsx";
import ToolSelector from "./ToolSelector.jsx";
import SidebarPalette from "./SidebarPalette.jsx";

import { useToast } from "../Hooks/useToast.js";
import { useCanvasHistory } from "../Hooks/useCanvasHistory.js";

import "../Styles/Workspace.css";

const Workspace = forwardRef(({ 
    panelWidth, 
    panelHeight, 
    selectedColor, 
    setColor, 
    goBack,
    activeDrawingId,
    setActiveDrawingId,
    drawings,
    updateDrawingsStorage,
    keybinds,
    setHasUnsavedChanges
}, ref) => {

    const pixelRef = useRef();
    const colorInputRef = useRef();
    const pendingCallbackRef = useRef(null); 
    const bucketActiveRef = useRef(false);
    
    const [lastColor, setLastColor] = useState(selectedColor);
    const [tool, setTool] = useState("pencil");
    const [grid, setGrid] = useState([]);
    const [hoveredPixelIndex, setHoveredPixelIndex] = useState(null);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [isNameModalOpen, setIsNameModalOpen] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false); // <-- 2. Modal Open State

    const [palette, setPalette] = useState([
        "#000000", "#ffffff", "#7f8c8d", "#b80000", "#db3e00", "#fccb00",
        "#008b02", "#006b76", "#1273de", "#5300eb", "#eb9696", "#f47373",
        "#ff007f", "#ff9ff3", "#feca57", "#5f27cd", "#00d2d3", "#1dd1a1"
    ]);


    const { toast, triggerToastNotification } = useToast();
    const {
        history,
        historyIndex,
        lastSavedIndex,
        setLastSavedIndex,
        initHistory,
        saveHistorySnapshot,
        handleUndo,
        handleRedo,
        appendDirectHistory
    } = useCanvasHistory(grid, setGrid, setHasUnsavedChanges);

    const activeDrawing = drawings ? drawings.find(d => d.id === activeDrawingId) : null;

    useEffect(() => {
        const initialGrid = activeDrawing && activeDrawing.grid 
            ? [...activeDrawing.grid] 
            : Array(panelWidth * panelHeight).fill("#ffffff00");
            
        setGrid(initialGrid);
        initHistory(initialGrid);
        if (setHasUnsavedChanges) setHasUnsavedChanges(false);
    }, [activeDrawingId, panelWidth, panelHeight, setHasUnsavedChanges, initHistory]);

    useEffect(() => {
        if (historyIndex !== -1 && setHasUnsavedChanges) {
            setHasUnsavedChanges(historyIndex !== lastSavedIndex);
        }
    }, [historyIndex, lastSavedIndex, setHasUnsavedChanges]);

 
    useEffect(() => {
        const handleWindowFocus = () => {
            if (isPickerOpen && colorInputRef.current) {
                const finalColor = colorInputRef.current.value.toLowerCase();
                setPalette((prev) => prev.includes(finalColor) ? prev : [finalColor, ...(prev.length >= 24 ? prev.slice(0, -1) : prev)]);
                setIsPickerOpen(false);
            }
        };
        window.addEventListener("focus", handleWindowFocus);
        return () => window.removeEventListener("focus", handleWindowFocus);
    }, [isPickerOpen]);

    const handleLiveColorPreview = (e) => {
        const liveColor = e.target.value.toLowerCase();
        setTool("pencil");
        setColor(liveColor);
        setLastColor(liveColor);
    };

    const handleCanvasMouseUp = () => {
        if (bucketActiveRef.current) {
            bucketActiveRef.current = false;
            return;
        }
        saveHistorySnapshot(grid);
    };

  
    const runFloodFill = (startIndex, targetColor) => {
        bucketActiveRef.current = true;
        const originalColor = grid[startIndex];
        if (originalColor === targetColor) return;

        const newGrid = [...grid];
        const pixelQueue = [startIndex];
        const visitedPixels = new Set([startIndex]);

        while (pixelQueue.length > 0) {
            const currentPixel = pixelQueue.shift();
            newGrid[currentPixel] = targetColor;

            const currentRow = Math.floor(currentPixel / panelWidth);
            const currentCol = currentPixel % panelWidth;
            const targetNeighbors = [];

            if (currentRow > 0) targetNeighbors.push((currentRow - 1) * panelWidth + currentCol);
            if (currentRow < panelHeight - 1) targetNeighbors.push((currentRow + 1) * panelWidth + currentCol);
            if (currentCol > 0) targetNeighbors.push(currentRow * panelWidth + (currentCol - 1));
            if (currentCol < panelWidth - 1) targetNeighbors.push(currentRow * panelWidth + (currentCol + 1));

            for (const neighborIndex of targetNeighbors) {
                if (!visitedPixels.has(neighborIndex) && grid[neighborIndex] === originalColor) {
                    visitedPixels.add(neighborIndex);
                    pixelQueue.push(neighborIndex);
                }
            }
        }
        setGrid(newGrid);
        appendDirectHistory(newGrid);
    };

    const handlePixelInteraction = (index, isDrawAction) => {
        if (tool === "eyedropper") {
            const colorSample = grid[index] && !["transparent", "rgba(0, 0, 0, 0)"].includes(grid[index]) ? grid[index] : "#ffffff00";
            setColor(colorSample);
            setLastColor(colorSample);
            setTool("pencil");
            return;
        }
        if (tool === "bucket") {
            if (isDrawAction) runFloodFill(index, selectedColor === "transparent" ? "#ffffff00" : selectedColor);
            return;
        }
        if (isDrawAction) {
            const activeColor = selectedColor === "transparent" ? "#ffffff00" : selectedColor;
            if (grid[index] !== activeColor) {
                setGrid((prevGrid) => {
                    const nextGrid = [...prevGrid];
                    nextGrid[index] = activeColor;
                    return nextGrid;
                });
            }
        }
    };


    const getProjectName = () => {
        if (activeDrawingId) {
            return drawings.find(d => d.id === activeDrawingId)?.name || "";
        }
        return "";
    };


    const handleExportConfirm = (filename) => {
        setIsExportModalOpen(false);
        if (!pixelRef.current) return triggerToastNotification("Export error: Canvas element not found.", "error");
        
        html2canvas(pixelRef.current, { backgroundColor: null, logging: false, useCORS: true })
            .then((canvas) => {
                const downloadLink = document.createElement("a");
                downloadLink.download = `${filename}.png`;  
                downloadLink.href = canvas.toDataURL();
                downloadLink.click();
                triggerToastNotification("Successfully exported as PNG!", "success");
            })
            .catch((err) => triggerToastNotification(`Rendering failure: ${err.message}`, "error"));
    };

    const handleSave = (callback = null, forcedName = null) => {
        let projectName = forcedName;

        if (!activeDrawingId && !projectName) {
            if (callback) pendingCallbackRef.current = callback;
            setIsNameModalOpen(true);
            return false;
        }
        if (activeDrawingId && !projectName) {
            projectName = getProjectName();
        }

        if (!pixelRef.current) return triggerToastNotification("Saving failed: Canvas reference missing.", "error");

        html2canvas(pixelRef.current, { backgroundColor: null, logging: false, useCORS: true, scale: 0.5 }).then((canvas) => {
            try {
                const previewDataUrl = canvas.toDataURL("image/png");
                const currentId = activeDrawingId || Date.now();
                
                const updatedDrawings = activeDrawingId 
                    ? drawings.map(d => d.id === currentId ? { ...d, grid, previewImg: previewDataUrl, width: panelWidth, height: panelHeight } : d)
                    : [{ id: currentId, name: projectName, width: panelWidth, height: panelHeight, grid, previewImg: previewDataUrl, accessCount: 1, lastAccessed: Date.now() }, ...drawings];

                if (!activeDrawingId) setActiveDrawingId(currentId);
                
                updateDrawingsStorage(updatedDrawings);
                setLastSavedIndex(historyIndex);
                if (setHasUnsavedChanges) setHasUnsavedChanges(false);
                triggerToastNotification(`"${projectName || 'Drawing'}" saved successfully!`, "success");
                
                if (callback) callback();
                if (pendingCallbackRef.current) { pendingCallbackRef.current(); pendingCallbackRef.current = null; }
            } catch (err) {
                triggerToastNotification(`Failed to save changes. ${err.message}`, "error");
            }
        });
        return true;
    };

    useImperativeHandle(ref, () => ({ triggerExternalSave: (cb) => handleSave(cb) }));

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
            if (e.ctrlKey || e.metaKey) {
                if (e.key.toLowerCase() === "z") { e.preventDefault(); handleUndo(); }
                if (e.key.toLowerCase() === "y") { e.preventDefault(); handleRedo(); }
                return;
            }
            const key = e.key.toLowerCase();
            if (keybinds && key === keybinds.pencil) { setTool("pencil"); setColor(lastColor); }
            else if (keybinds && key === keybinds.eraser) { setTool("eraser"); setColor("transparent"); }
            else if (key === (keybinds?.colorPicker || "i")) setTool("eyedropper");
            else if (key === (keybinds?.bucket || "b")) setTool("bucket");
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [keybinds, lastColor, setColor, handleUndo, handleRedo]);

    return (
        <div id="workspace">
            {toast.visible && (
                <div className={`system-toaster ${toast.type}`}>
                    <div className="toast-icon">{toast.type === "success" ? "✓" : "⚠"}</div>
                    <div className="toast-text">{toast.message}</div>
                </div>
            )}

            <ToolMenuBar goBack={goBack} onSave={() => handleSave()} onExport={() => setIsExportModalOpen(true)} />

            <ToolSelector tool={tool} setTool={setTool} setColor={setColor} lastColor={lastColor} keybinds={keybinds} />

            <SidebarPalette 
                palette={palette} selectedColor={selectedColor} lastColor={lastColor} setColor={setColor}
                colorInputRef={colorInputRef} handleLiveColorPreview={handleLiveColorPreview} setIsPickerOpen={setIsPickerOpen} 
            />

            <div className="wrapper">
                <div className="canvas-area" onMouseUp={handleCanvasMouseUp}>
                    <DrawingPanel 
                        ref={pixelRef} width={panelWidth} height={panelHeight} selectedColor={selectedColor}
                        grid={grid} tool={tool} hoveredPixelIndex={hoveredPixelIndex}
                        setHoveredPixelIndex={setHoveredPixelIndex} onPixelInteract={handlePixelInteraction}
                    />
                </div>

                <div className="canvas-controls-bottom">
                    <button className="tool-btn" onClick={handleUndo} disabled={historyIndex <= 0}>Undo</button>
                    <button className="tool-btn" onClick={handleRedo} disabled={historyIndex >= history.length - 1}>Redo</button>
                </div>
            </div>

            <SaveNameModal isOpen={isNameModalOpen} onClose={() => { setIsNameModalOpen(false); pendingCallbackRef.current = null; }} onConfirm={(name) => { setIsNameModalOpen(false); handleSave(null, name); }} />
            

            <ExportModal 
                isOpen={isExportModalOpen} 
                onClose={() => setIsExportModalOpen(false)} 
                onConfirm={handleExportConfirm}
                defaultName={getProjectName()} 
            />
        </div>
    );
});

export default Workspace;