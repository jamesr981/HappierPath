import { useEffect, useState } from 'react';
import SupportButtons from './components/support-buttons/SupportButtons';
import {
  getLinksFromStorage,
  getOptionsFromStorage,
  saveLinksToStorage,
  saveOptionsToStorage,
} from './functions/storage';
import { Options } from './types/Options';
import { Box, Typography, Paper, Stack, Checkbox, FormControlLabel } from '@mui/material';

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
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        Options
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }} elevation={1}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Sync Paths to Account:
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={options.useSyncStorage}
                id="useSyncStorage"
                color="primary"
                onChange={() =>
                  changeOptions({
                    ...options,
                    useSyncStorage: !options.useSyncStorage,
                  })
                }
              />
            }
            label=""
            sx={{ ml: 'auto' }}
          />
        </Stack>
      </Paper>
      <SupportButtons />
    </Box>
  );
};

export default OptionsApp;
