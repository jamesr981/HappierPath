import { Box, Typography, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 1,
        p: '8px 12px',
        backgroundColor: theme.palette.primary.main,
        borderRadius: 1,
        color: theme.palette.primary.contrastText,
        minHeight: 0,
      }}
    >
      <Stack spacing={0} sx={{ minWidth: 0 }}>
        <Typography
          variant="h6"
          component="h1"
          sx={{ fontWeight: 'bold', lineHeight: 1.1 }}
        >
          HappierPath
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontStyle: 'italic',
            lineHeight: 1.1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            color: theme.palette.primary.contrastText,
          }}
        >
          ... because everything is still relative
        </Typography>
      </Stack>
      <IconButton
        size="small"
        onClick={() => window.close()}
        sx={{
          color: theme.palette.getContrastText(theme.palette.error.main),
          backgroundColor: 'error.main',
          '&:hover': {
            backgroundColor: 'error.dark',
          },
          ml: 1,
          width: 28,
          height: 28,
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default Header;
