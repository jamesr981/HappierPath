import { useEffect, useState } from 'react';
import SupportButtons from './components/support-buttons/SupportButtons';
import {
  getLinksFromStorage,
  getOptionsFromStorage,
  saveLinksToStorage,
  saveOptionsToStorage,
} from './functions/storage';
import { Options } from './types/Options';

const OptionsApp = () => {
  const [options, setOptions] = useState<Options>({ useSyncStorage: false });

  const changeOptions = async (options: Options) => {
    const links = await getLinksFromStorage();
    await saveOptionsToStorage(options);
    await saveLinksToStorage(links);
    setOptions(options);
  };

  useEffect(() => {
    const asyncSetup = async () => {
      const options: Options = await getOptionsFromStorage();
      setOptions(options);
    };

    asyncSetup();
  }, []);

  return (
    <>
      <div className="header">
        <h3>Options</h3>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          verticalAlign: 'middle',
          padding: '10px 10px 20px 5px',
        }}
      >
        <h2>Sync Paths to Account:</h2>
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
