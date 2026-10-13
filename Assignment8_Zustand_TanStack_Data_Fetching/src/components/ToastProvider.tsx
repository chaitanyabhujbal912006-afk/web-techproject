import React, { createContext, useCallback, useContext, useState } from "react";

export type ToastSeverity = "success" | "error" | "info";
type ToastItem = { id: number; severity: ToastSeverity; summary: string; detail: string };
type ToastContextValue = { showToast: (severity: ToastSeverity, summary: string, detail: string) => void };
const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: React.PropsWithChildren) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const showToast = useCallback((severity: ToastSeverity, summary: string, detail: string) => {
    const id = Date.now() + Math.random();
    setItems((old) => [...old, { id, severity, summary, detail }]);
    window.setTimeout(() => setItems((old) => old.filter((item) => item.id !== id)), 4500);
  }, []);
  return <ToastContext.Provider value={{ showToast }}>
    {children}
    <div className="toast-stack" aria-live="polite">
      {items.map((item) => <div className={`toast ${item.severity}`} key={item.id}>
        <strong>{item.summary}</strong><span>{item.detail}</span>
      </div>)}
    </div>
  </ToastContext.Provider>;
}
export function useToast() {
  const value = useContext(ToastContext);
  if (!value) throw new Error("useToast must be used inside ToastProvider");
  return value;
}