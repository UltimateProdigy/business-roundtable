"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

export type ToastColor = "success" | "danger" | "warning" | "primary" | "default";

export interface ToastOptions {
  title: string;
  description?: string;
  color?: ToastColor;
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: string;
}

type Listener = (toast: ToastItem) => void;
const listeners = new Set<Listener>();

export function addToast(options: ToastOptions) {
  const item: ToastItem = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    color: "default",
    duration: 4500,
    ...options,
  };
  listeners.forEach((listener) => listener(item));
}

export default function ToastWrapper() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleNewToast: Listener = (newToast) => {
      setToasts((prev) => [...prev, newToast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
      }, newToast.duration || 4500);
    };

    listeners.add(handleNewToast);
    return () => {
      listeners.delete(handleNewToast);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.color === "success";
        const isDanger = toast.color === "danger";
        const isWarning = toast.color === "warning";

        const borderClass = isSuccess
          ? "border-emerald-500/40 bg-slate-900/95"
          : isDanger
          ? "border-red-500/40 bg-slate-900/95"
          : isWarning
          ? "border-amber-500/40 bg-slate-900/95"
          : "border-primary/40 bg-slate-900/95";

        const accentBarClass = isSuccess
          ? "bg-emerald-500"
          : isDanger
          ? "bg-red-500"
          : isWarning
          ? "bg-amber-500"
          : "bg-primary";

        const IconComponent = isSuccess
          ? CheckCircle2
          : isDanger
          ? AlertCircle
          : isWarning
          ? AlertTriangle
          : Info;

        const iconColorClass = isSuccess
          ? "text-emerald-400 bg-emerald-500/15"
          : isDanger
          ? "text-red-400 bg-red-500/15"
          : isWarning
          ? "text-amber-400 bg-amber-500/15"
          : "text-primary bg-primary/15";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto relative overflow-hidden rounded-2xl border ${borderClass} backdrop-blur-xl text-white shadow-2xl p-4 flex items-start gap-3.5 transition-all duration-300 animate-in fade-in slide-in-from-top-2`}
          >
            {/* Left colored accent bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${accentBarClass}`} />

            {/* Icon */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ml-1 ${iconColorClass}`}
            >
              <IconComponent size={19} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0 pr-2">
              <p className="text-sm font-bold text-white leading-snug">
                {toast.title}
              </p>
              {toast.description && (
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer flex-shrink-0"
              aria-label="Close notification"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
