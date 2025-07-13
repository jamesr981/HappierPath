import { Paper, Stack } from '@mui/material';
import InfoRow from './InfoRow';

interface InfoProps {
  url: URL | null;
}

const Info = ({ url }: InfoProps) => {
  return (
    <Paper elevation={2} sx={{ p: 1.2, mb: 2 }}>
      <Stack spacing={0}>
        <InfoRow label="Protocol" value={url?.protocol.replace(':', '')} />
        <InfoRow label="Host" value={url?.hostname} />
        <InfoRow label="Port" value={url?.port} />
        <InfoRow label="Path" value={url?.pathname} />
        <InfoRow label="Query" value={url?.search} />
      </Stack>
    </Paper>
  );
};

export default Info;
