import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import SupportButtons from './components/support-buttons/SupportButtons';
import { getCurrentOptions, Options } from './functions/setup';
import {
  getLinksFromStorage,
  saveLinksToStorage,
  saveUseSyncStorageToStorage,
} from './functions/storage';

const OptionsApp = () => {
  const [options, setOptions] = useState<Options>({ useSyncStorage: false });

  const changeOptions = async (options: Options) => {
    const links = await getLinksFromStorage();
    await saveUseSyncStorageToStorage(options);
    await saveLinksToStorage(links);
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
