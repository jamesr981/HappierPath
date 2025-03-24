import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import PathEditor from './components/path-editor/PathEditor';
import SupportButtons from './components/support-buttons/SupportButtons';
import Manipulator from './components/manipulator/Manipulator';
import { loadLinks, getCurrentTab } from './functions/setup';
import { Links } from './types/Link';

const App = () => {
  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab>();
  const [currentUrl, setCurrentUrl] = useState<URL | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [links, setLinks] = useState<Links>({ links: [] });

  useEffect(() => {
    const asyncSetup = async () => {
      const tab = await getCurrentTab();
      setCurrentTab(tab);
    };

    asyncSetup();
  }, []);

  useEffect(() => {
    const asyncLoadLinks = async () => {
      const links = await loadLinks();
      setLinks(links);
    };
    asyncLoadLinks();
  }, []);

  useEffect(() => {
    if (!currentTab) return;
    let url: URL | null = null;
    if (currentTab.pendingUrl) {
      url = new URL(currentTab.pendingUrl);
    } else if (currentTab.url) {
      url = new URL(currentTab.url);
    }

    setCurrentUrl(url);
  }, [currentTab]);

  return (
    <>
      <Header />

      <Manipulator
        tab={currentTab}
        setCurrentTab={setCurrentTab}
        url={currentUrl}
        isEditorOpen={isEditorOpen}
        setIsEditorOpen={setIsEditorOpen}
        links={links.links}
      />

      {(isEditorOpen && <PathEditor links={links} setLinks={setLinks} />) ||
        null}

      <SupportButtons />
    </>
  );
};

export default App;
