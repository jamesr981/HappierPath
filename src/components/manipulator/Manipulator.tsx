import { useEffect, useState } from 'react';
import Info from '../info/Info';
import NavigationBar from '../navigation-bar/NavigationBar';
import ToggleLink from '../toggle-link/ToggleLink';
import PathList from '../path-list/PathList';
import { IsProtocol, Links, Protocol } from '../../types/Link';
import Browser from 'webextension-polyfill';
import { Box, Paper } from '@mui/material';
import PathEditor from '../path-editor/PathEditor';
import { webext } from '../../functions/webext';
import type { GroupStrategy } from '../../functions/gopath';

interface ManipulatorProps {
  tab: Browser.Tabs.Tab | undefined;
  setCurrentTab: (tab: Browser.Tabs.Tab | undefined) => void;
  url: URL | null;
  links: Links;
  setLinks: (links: Links) => void;
}

const Manipulator = ({
  url,
  links,
  setLinks,
}: ManipulatorProps) => {
  const [isInfoShown, setIsInfoShown] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol>('http://');
  const [hostname, setHostname] = useState('');
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  useEffect(() => {
    if (!url) return;
    const formattedProtocol = url.protocol + '//';
    if (IsProtocol(formattedProtocol)) {
      setSelectedProtocol(formattedProtocol as Protocol);
    }

    setHostname(url.hostname);
  }, [url]);

  const onNavigateLinkClick = (
    dataUrl: string | null,
    newTab: boolean,
    url: URL
  ) => {
    const urlDomain = selectedProtocol + hostname;
    let newUrl = '';
    if (!dataUrl) {
      newUrl = urlDomain + url.pathname;
    } else {
      newUrl += urlDomain + dataUrl;
    }

    // If user clicked “+tab”, request: open in a new tab, same group (Chrome).
    // If they clicked the normal link, reuse the current tab.
    const strategy: GroupStrategy | undefined = newTab ? { kind: "same-group" } : undefined;

    // No direct Browser.tabs.* calls here — let background do it (and group it).
    void webext.runtime.sendMessage({
      action: "openLink",
      url: newUrl,
      newTab,
      strategy, // background will group if Chrome
    });
  };

  return (
    <Box>
      <NavigationBar
        url={url}
        selectedProtocol={selectedProtocol}
        setSelectedProtocol={setSelectedProtocol}
        hostname={hostname}
        setHostname={setHostname}
        onNavigateLinkClick={onNavigateLinkClick}
      />
      <Box
        className="tools"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <ToggleLink
          setToggle={setIsEditorOpen}
          toggle={isEditorOpen}
          toggledText="Close Path Editor"
          untoggledText="Open Path Editor"
        />
        <ToggleLink
          setToggle={setIsInfoShown}
          toggle={isInfoShown}
          toggledText="Hide Page Info"
          untoggledText="Show Page Info"
        />
        {/* <InfoLink isInfoShown={isInfoShown} setIsInfoShown={setIsInfoShown} /> */}
      </Box>

      {(isInfoShown && (
        <Paper sx={{ pl: '4px', pb: '4px', mb: '4px' }}>
          <Info url={url} />
        </Paper>
      )) ||
        null}

      <Paper sx={{ pl: '4px', pb: '4px' }}>
        {(isEditorOpen && <PathEditor links={links} setLinks={setLinks} />) || (
          <PathList
            links={links.links}
            url={url}
            onNavigateLinkClick={onNavigateLinkClick}
          />
        )}
      </Paper>
    </Box>
  );
};

export default Manipulator;
