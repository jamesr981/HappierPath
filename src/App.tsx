import { useEffect, useMemo, useState } from 'react';
import Header from './components/header/Header';
import SupportButtons from './components/support-buttons/SupportButtons';
import Manipulator from './components/manipulator/Manipulator';
import { getCurrentTab } from './functions/setup';
import { Links } from './types/Link';
import Browser from 'webextension-polyfill';
import { getLinksFromStorage } from './functions/storage';
import { Box } from '@mui/material';

const App = () => {
  const [currentTab, setCurrentTab] = useState<Browser.Tabs.Tab>();
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

  const currentUrl = useMemo(() => {
    if (!currentTab) {
      return null;
    }

    if (currentTab.pendingUrl) {
      return new URL(currentTab.pendingUrl);
    }

    if (currentTab.url) {
      return new URL(currentTab.url);
    }

    return null;
  }, [currentTab]);

  return (
    <>
      <Box
        sx={{
          width: 410,
          mx: 'auto',
          p: '4px',
          bgcolor: 'background.default',
        }}
      >
        <Box
          sx={{
            mb: 1,
          }}
        >
          <Header />
        </Box>

        <Box sx={{ mb: '8px' }}>
          <Manipulator
            key={currentUrl?.href}
            tab={currentTab}
            setCurrentTab={setCurrentTab}
            url={currentUrl}
            links={links}
            setLinks={setLinks}
          />
        </Box>

        <SupportButtons />
      </Box>
    </>
  );
};

export default App;
