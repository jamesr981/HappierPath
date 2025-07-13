import Browser from 'webextension-polyfill';
import { Button } from '@mui/material';

interface LinkButtonProps {
  link: string;
  buttonText: string;
}

const LinkButton = ({ link, buttonText }: LinkButtonProps) => {
  const onButtonClick = function () {
    Browser.tabs.create({ url: link });
  };
  return (
    <Button
      onClick={onButtonClick}
      variant="contained"
      color="primary"
      size="small"
      sx={{ mr: 1, textTransform: 'none', fontWeight: 500 }}
    >
      {buttonText}
    </Button>
  );
};

export default LinkButton;
