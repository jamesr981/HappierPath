import { Box, Typography, IconButton, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 1,
        p: '8px 12px',
        backgroundColor: 'primary.main',
        borderRadius: 1,
        color: 'white',
        minHeight: 0,
      }}
    >
      <Stack spacing={0} sx={{ minWidth: 0 }}>
        <Typography variant="h6" component="h1" sx={{ fontWeight: 'bold', lineHeight: 1.1 }}>
          HappierPath
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: 'italic', lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          ... because everything is still relative
        </Typography>
      </Stack>
      <IconButton
        size="small"
        onClick={() => window.close()}
        sx={{
          color: 'white',
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
