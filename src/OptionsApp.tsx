import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import SupportButtons from './components/support-buttons/SupportButtons';
import { getCurrentOptions, Options } from './functions/setup';
import { getLinksFromStorage, saveLinksToStorage, saveUseSyncStorageToStorage } from './functions/storage';
import { Links } from './types/Link';

const OptionsApp = () => {
  const [options, setOptions] = useState<Options>({ useSyncStorage: false });

  const changeOptions = (options: Options) => {
    let links: Links = { links: [] };

    getLinksFromStorage()
    .then((linksFromStoage) => {
      links = linksFromStoage
      saveUseSyncStorageToStorage(options);
    })
    .then(() => saveLinksToStorage(links));
    
    setOptions(options);
  };

  useEffect(() => {
    const asyncSetup = async () => {
      const options: Options = await getCurrentOptions();
      setOptions(options);
    };

    asyncSetup();
  }, []);

  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          verticalAlign: 'middle',
          padding: '10px 10px 20px 5px',
        }}
      >
        <h2>Sync Paths To Account:</h2>
        <input
          type="checkbox"
          checked={options.useSyncStorage}
          id="useSyncStorage"
          style={{ verticalAlign: 'middle', marginLeft: 'auto' }}
          onChange={() =>
            changeOptions({
              ...options,
              useSyncStorage: !options.useSyncStorage,
            })
          }
        />
      </div>
      <SupportButtons />
    </>
  );
};

export default OptionsApp;
