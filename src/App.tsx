import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import PathEditor from './components/path-editor/PathEditor';
import SupportButtons from './components/support-buttons/SupportButtons';
import Manipulator from './components/manipulator/Manipulator';
import { getCurrentTab } from './functions/setup';
import { Links } from './types/Link';
import Browser from 'webextension-polyfill';
import { getLinksFromStorage } from './functions/storage';
import { CssBaseline, Box } from '@mui/material';

const App = () => {
  const [currentTab, setCurrentTab] = useState<Browser.Tabs.Tab>();
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
      const links = await getLinksFromStorage();
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
      <CssBaseline />
      <Box
        sx={{
          width: 410,
          minHeight: '100vh',
          mx: 'auto',
          p: '4px',
          bgcolor: '#f9f9f9',
        }}
      >
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
      </Box>
    </>
  );
};

export default App;
