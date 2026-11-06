'use client';

import {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react';
import {cn} from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────
export type AlertVariant = 'success' | 'error' | 'info' | 'warning';

export interface AlertData {
  id: string;
  variant: AlertVariant;
  title?: string;
  message: string;
  duration?: number; // ms; default 5000
}

interface AlertContextType {
  alerts: AlertData[];
  showAlert: (alert: Omit<AlertData, 'id'>) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  dismiss: (id: string) => void;
}

// ─── Context ──────────────────────────────────────────────────────────
const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlert must be used within <AlertProvider>');
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────
export function AlertProvider({children}: {children: React.ReactNode}) {
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  const dismiss = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const showAlert = useCallback(
    (alert: Omit<AlertData, 'id'>) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const newAlert: AlertData = {id, duration: 5000, ...alert};
      setAlerts((prev) => [...prev, newAlert]);

      // Auto-dismiss
      if (newAlert.duration && newAlert.duration > 0) {
        setTimeout(() => dismiss(id), newAlert.duration);
      }
    },
    [dismiss]
  );

  const success = useCallback(
    (message: string, title?: string) =>
      showAlert({variant: 'success', message, title}),
    [showAlert]
  );
  const error = useCallback(
    (message: string, title?: string) =>
      showAlert({variant: 'error', message, title}),
    [showAlert]
  );
  const info = useCallback(
    (message: string, title?: string) =>
      showAlert({variant: 'info', message, title}),
    [showAlert]
  );
  const warning = useCallback(
    (message: string, title?: string) =>
      showAlert({variant: 'warning', message, title}),
    [showAlert]
  );

  return (
    <AlertContext.Provider
      value={{alerts, showAlert, success, error, info, warning, dismiss}}>
      {children}
      <AlertContainer
        alerts={alerts}
        onDismiss={dismiss}
      />
    </AlertContext.Provider>
  );
}

// ─── Container ────────────────────────────────────────────────────────
function AlertContainer({
  alerts,
  onDismiss,
}: {
  alerts: AlertData[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed top-4 right-4 z-100 flex w-full max-w-sm flex-col gap-3">
      {alerts.map((alert) => (
        <AlertItem
          key={alert.id}
          alert={alert}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
}

// ─── Single Alert ─────────────────────────────────────────────────────
function AlertItem({
  alert,
  onDismiss,
}: {
  alert: AlertData;
  onDismiss: (id: string) => void;
}) {
  const [leaving, setLeaving] = useState(false);
  const [entering, setEntering] = useState(true);

  // Enter animation
  useEffect(() => {
    const t = setTimeout(() => setEntering(false), 20);
    return () => clearTimeout(t);
  }, []);

  const handleDismiss = () => {
    setLeaving(true);
    setTimeout(() => onDismiss(alert.id), 400); // Match CSS exit duration
  };

  const icons: Record<AlertVariant, React.ReactNode> = {
    success: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5">
        <path
          d="M20 6L9 17l-5-5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    error: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M15 9l-6 6M9 9l6 6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    info: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M12 11v5M12 8h.01"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    warning: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-5 w-5">
        <path
          d="M12 3l10 18H2L12 3z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M12 10v4M12 17h.01"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  };

  return (
    <div
      role="alert"
      onClick={handleDismiss}
      className={cn(
        'alert-item pointer-events-auto relative cursor-pointer overflow-hidden rounded-xl border-l-4 p-4 shadow-lg backdrop-blur-sm',
        `alert-${alert.variant}`,
        entering && 'alert-enter',
        leaving && 'alert-leave'
      )}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">{icons[alert.variant]}</div>
        <div className="flex-1">
          {alert.title && (
            <p className="text-sm font-semibold leading-tight">{alert.title}</p>
          )}
          <p
            className={cn(
              'text-sm leading-snug',
              alert.title && 'mt-0.5 opacity-90'
            )}>
            {alert.message}
          </p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          className="shrink-0 opacity-50 transition-opacity hover:opacity-100"
          aria-label="Dismiss">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Progress bar showing time left */}
      {alert.duration && alert.duration > 0 && (
        <div
          className="alert-progress absolute bottom-0 left-0 h-0.5"
          style={{animationDuration: `${alert.duration}ms`}}
        />
      )}
    </div>
  );
}
