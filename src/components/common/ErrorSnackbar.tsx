import { Snackbar, Alert, Typography } from '@mui/material';

interface ErrorSnackbarProps {
  open: boolean;
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
  severity?: 'error' | 'warning' | 'info' | 'success';
}

const ErrorSnackbar = ({
  open,
  message,
  onClose,
  autoHideDuration = 6000,
  severity = 'error',
}: ErrorSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert 
        onClose={onClose} 
        severity={severity} 
        sx={{ width: '100%' }}
      >
        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar; 