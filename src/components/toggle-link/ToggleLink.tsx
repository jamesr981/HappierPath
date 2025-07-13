import { Button } from '@mui/material';

interface ToggleLinkProps {
  setToggle: (toggle: boolean) => void;
  toggle: boolean;
  toggledText: string;
  untoggledText: string;
}

const ToggleLink = ({
  setToggle,
  toggle,
  toggledText,
  untoggledText,
}: ToggleLinkProps) => {
  return (
    <Button
      id="togglePathEditor"
      variant="text"
      size="small"
      onClick={() => setToggle(!toggle)}
      sx={{ minWidth: 0, p: 0, textTransform: 'none' }}
    >
      {toggle ? toggledText : untoggledText}
    </Button>
  );
};

export default ToggleLink;
