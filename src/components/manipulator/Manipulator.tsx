import { useEffect, useState } from 'react';
import Info from '../info/Info';
import NavigationBar from '../navigation-bar/NavigationBar';
import ToggleLink from '../toggle-link/ToggleLink';
import InfoLink from '../info-link/InfoLink';
import PathList from '../path-list/PathList';
import { IsProtocol, Link, Protocol } from '../../types/Link';
import { getCurrentTab } from '../../functions/setup';
import Browser from 'webextension-polyfill';

interface ManipulatorProps {
  tab: Browser.Tabs.Tab | undefined;
  setCurrentTab: (tab: Browser.Tabs.Tab | undefined) => void;
  url: URL | null;
  isEditorOpen: boolean;
  setIsEditorOpen: (val: boolean) => void;
  links: Link[];
}

const Manipulator = ({
  tab,
  setCurrentTab,
  url,
  isEditorOpen,
  setIsEditorOpen,
  links,
}: ManipulatorProps) => {
  const [isInfoShown, setIsInfoShown] = useState(false);

  const [selectedProtocol, setSelectedProtocol] = useState<Protocol>('http://');

  const [hostname, setHostname] = useState('');

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

    const handleTabUpdate = (
      updatedTabId: number,
      changeInfo: Browser.Tabs.OnUpdatedChangeInfoType
    ) => {
      if (updatedTabId === tab?.id && changeInfo.status === 'complete') {
        Browser.tabs.onUpdated.removeListener(handleTabUpdate); // Cleanup listener
        getCurrentTab().then((tab) => {
          setCurrentTab(tab);
        });
      }
    };

    Browser.tabs.onUpdated.addListener(handleTabUpdate);

    if (newTab || !tab?.id) {
      Browser.tabs.create({ url: newUrl });
    } else {
      Browser.tabs.update(tab.id, { url: newUrl });
    }
  };

  return (
    <div id="manipulator">
      <NavigationBar
        url={url}
        selectedProtocol={selectedProtocol}
        setSelectedProtocol={setSelectedProtocol}
        hostname={hostname}
        setHostname={setHostname}
        onNavigateLinkClick={onNavigateLinkClick}
      />
      <div className="tools">
        <ToggleLink
          setToggle={setIsEditorOpen}
          toggle={isEditorOpen}
          toggledText="Close Path Editor"
          untoggledText="Open Path Editor"
        />

        <InfoLink isInfoShown={isInfoShown} setIsInfoShown={setIsInfoShown} />
      </div>
      {(isInfoShown && <Info url={url} />) || null}

      <PathList
        links={links}
        url={url}
        onNavigateLinkClick={onNavigateLinkClick}
      />
    </div>
  );
};

export default Manipulator;
