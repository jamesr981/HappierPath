import { Typography } from '@mui/material';

interface InfoRowProps {
  label: string;
  value: string | undefined;
  id?: string;
}

const InfoRow = ({ label, value, id }: InfoRowProps) => {
  return (
    <Typography variant="body2" sx={{ mb: 0 }}>
      <span style={{ fontWeight: 600, fontStyle: 'italic' }}>{label}:</span>{' '}
      <span id={id} style={{ wordBreak: 'break-all' }}>
        {value}
      </span>
    </Typography>
  );
};

export default InfoRow;
