import { useState, useRef, useEffect, useCallback } from "react";

export function useToast() {
    const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
    const toastTimeoutRef = useRef(null);

    const triggerToastNotification = useCallback((message, type = "success") => {
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        setToast({ visible: true, message, type });
        toastTimeoutRef.current = setTimeout(() => {
            setToast({ visible: false, message: "", type: "success" });
        }, 4000);
    }, []);

    useEffect(() => {
        return () => {
            if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        };
    }, []);

    return { toast, triggerToastNotification };
}