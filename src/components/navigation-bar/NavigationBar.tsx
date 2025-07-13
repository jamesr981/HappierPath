import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { IsProtocol, Protocol } from '../../types/Link';

interface NavigationBarProps {
  url: URL | null;
  selectedProtocol: Protocol;
  setSelectedProtocol: (protocol: Protocol) => void;
  hostname: string;
  setHostname: (hostname: string) => void;
  onNavigateLinkClick: (
    dataUrl: string | null,
    newTab: boolean,
    url: URL
  ) => void;
}

const NavigationBar = ({
  url,
  selectedProtocol,
  setSelectedProtocol,
  hostname,
  setHostname,
  onNavigateLinkClick,
}: NavigationBarProps) => {
  const onGoClicked = () => {
    if (!url) return;
    onNavigateLinkClick(null, false, url);
  };

  const onProtocolChange = (value: string) => {
    if (!IsProtocol(value)) return;
    const protocol = value as Protocol;
    setSelectedProtocol(protocol);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
      <FormControl size="small" sx={{ minWidth: 90 }}>
        <InputLabel id="protocolSelector-label">Protocol</InputLabel>
        <Select
          labelId="protocolSelector-label"
          id="protocolSelector"
          value={selectedProtocol}
          label="Protocol"
          onChange={(e) => onProtocolChange(e.target.value)}
        >
          <MenuItem value="http://">http://</MenuItem>
          <MenuItem value="https://">https://</MenuItem>
          <MenuItem value="ftp://">ftp://</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="currentDomain"
        label="Domain"
        variant="outlined"
        size="small"
        value={hostname}
        onChange={(e) => setHostname(e.target.value)}
        sx={{ minWidth: 180 }}
      />
      <Button
        id="pathGo"
        variant="contained"
        color="primary"
        size="small"
        onClick={onGoClicked}
        sx={{ minWidth: 56 }}
      >
        GO!
      </Button>
    </Stack>
  );
};

export default NavigationBar;
