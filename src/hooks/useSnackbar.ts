import { useState, useCallback } from 'react';

interface UseSnackbarReturn {
  isOpen: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
  showSuccess: (message: string) => void;
  close: () => void;
}

export const useSnackbar = (): UseSnackbarReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('error');

  const showMessage = useCallback((newMessage: string, newSeverity: 'error' | 'warning' | 'info' | 'success') => {
    setMessage(newMessage);
    setSeverity(newSeverity);
    setIsOpen(true);
  }, []);

  const showError = useCallback((newMessage: string) => {
    showMessage(newMessage, 'error');
  }, [showMessage]);

  const showWarning = useCallback((newMessage: string) => {
    showMessage(newMessage, 'warning');
  }, [showMessage]);

  const showInfo = useCallback((newMessage: string) => {
    showMessage(newMessage, 'info');
  }, [showMessage]);

  const showSuccess = useCallback((newMessage: string) => {
    showMessage(newMessage, 'success');
  }, [showMessage]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    message,
    severity,
    showError,
    showWarning,
    showInfo,
    showSuccess,
    close,
  };
}; 