import { Paper, Stack } from '@mui/material';
import InfoRow from './InfoRow';

interface InfoProps {
  url: URL | null;
}

const Info = ({ url }: InfoProps) => {
  return (
    <Paper elevation={2} sx={{ p: 1.2, mb: 2, backgroundColor: '#f9f9f9' }}>
      <Stack spacing={0}>
        <InfoRow label="Protocol" value={url?.protocol.replace(':', '')} id="protocol" />
        <InfoRow label="Host" value={url?.hostname} id="host" />
        <InfoRow label="Port" value={url?.port} id="port" />
        <InfoRow label="Path" value={url?.pathname} id="path" />
        <InfoRow label="Query" value={url?.search} id="query" />
      </Stack>
    </Paper>
  );
};

export default Info;
