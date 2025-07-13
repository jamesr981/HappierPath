import { useEffect, useState } from 'react';
import SupportButtons from './components/support-buttons/SupportButtons';
import {
  getLinksFromStorage,
  getOptionsFromStorage,
  saveLinksToStorage,
  saveOptionsToStorage,
} from './functions/storage';
import { Options } from './types/Options';
import { ThemeMode } from './types/ThemeMode';
import {
  Box,
  Typography,
  Paper,
  Stack,
  Checkbox,
  FormControlLabel,
  CssBaseline,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useTheme } from './contexts/ThemeContext';

const OptionsApp = () => {
  const [options, setOptions] = useState<Options>({ useSyncStorage: false, theme: 'light' as ThemeMode });
  const { setTheme } = useTheme();

  const changeOptions = async (options: Options) => {
    const links = await getLinksFromStorage();
    await saveOptionsToStorage(options);
    await saveLinksToStorage(links);
    setOptions(options);
    setTheme(options.theme);
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
      <CssBaseline />
      <Box
        sx={{
          width: 410,
          mx: 'auto',
          bgcolor: 'background.default',
          p: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Options
        </Typography>
        <Paper sx={{ p: 2, mb: 2 }} elevation={1}>
          <Stack spacing={2}>
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
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Theme:
              </Typography>
              <FormControl sx={{ minWidth: 120, ml: 'auto' }}>
                <InputLabel id="theme-selector-label">Theme</InputLabel>
                <Select
                  labelId="theme-selector-label"
                  value={options.theme}
                  label="Theme"
                  onChange={(e) =>
                    changeOptions({
                      ...options,
                      theme: e.target.value as ThemeMode,
                    })
                  }
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Paper>
        <SupportButtons />
      </Box>
    </>
  );
};

export default OptionsApp;
