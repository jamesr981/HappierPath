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
    <>
      <label htmlFor="currentDomain">Domain:</label>
      <select
        name="protocolSelector"
        id="protocolSelector"
        value={selectedProtocol}
        onChange={(e) => onProtocolChange(e.currentTarget.value)}
        style={{marginRight: '8px'}}
      >
        <option value="http://">http://</option>
        <option value="https://">https://</option>
        <option value="ftp://">ftp://</option>
      </select>
      <input
        type="text"
        name="currentDomain"
        id="currentDomain"
        size={38}
        value={hostname}
        onChange={(e) => setHostname(e.target.value)}
        style={{marginRight: '8px'}}
      />
      <button id="pathGo" onClick={onGoClicked}>
        GO!
      </button>
      <br />
    </>
  );
};

export default NavigationBar;
