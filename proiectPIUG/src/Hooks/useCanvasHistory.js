import { useState, useCallback } from "react";

export function useCanvasHistory(grid, setGrid, setHasUnsavedChanges) {
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [lastSavedIndex, setLastSavedIndex] = useState(0);

    const initHistory = useCallback((initialGrid) => {
        setHistory([initialGrid]);
        setHistoryIndex(0);
        setLastSavedIndex(0);
    }, []);

    const saveHistorySnapshot = useCallback((currentCanvasGrid) => {
        const gridToSave = currentCanvasGrid || grid;
        if (!gridToSave || gridToSave.length === 0) return;
        
        setHistory((prevHistory) => {
            const cleanHistory = prevHistory.slice(0, historyIndex + 1);
            const lastSnapshot = cleanHistory[cleanHistory.length - 1];
            
            if (lastSnapshot && JSON.stringify(lastSnapshot) === JSON.stringify(gridToSave)) {
                return prevHistory; 
            }
            
            return [...cleanHistory, gridToSave];
        });
        
        setHistoryIndex((prevIdx) => prevIdx + 1);
    }, [historyIndex, grid]);

    const handleUndo = useCallback(() => {
        if (historyIndex > 0) {
            const nextIdx = historyIndex - 1;
            setGrid([...history[nextIdx]]);
            setHistoryIndex(nextIdx);
            if (setHasUnsavedChanges) setHasUnsavedChanges(nextIdx !== lastSavedIndex);
        }
    }, [historyIndex, history, lastSavedIndex, setGrid, setHasUnsavedChanges]);

    const handleRedo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            const nextIdx = historyIndex + 1;
            setGrid([...history[nextIdx]]);
            setHistoryIndex(nextIdx);
            if (setHasUnsavedChanges) setHasUnsavedChanges(nextIdx !== lastSavedIndex);
        }
    }, [historyIndex, history, lastSavedIndex, setGrid, setHasUnsavedChanges]);

    const appendDirectHistory = useCallback((newGrid) => {
        setHistory((prevHistory) => {
            const cleanHistory = prevHistory.slice(0, historyIndex + 1);
            return [...cleanHistory, newGrid];
        });
        setHistoryIndex((prevIdx) => prevIdx + 1);
    }, [historyIndex]);

    return {
        history,
        historyIndex,
        lastSavedIndex,
        setLastSavedIndex,
        initHistory,
        saveHistorySnapshot,
        handleUndo,
        handleRedo,
        appendDirectHistory
    };
}