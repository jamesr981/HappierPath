import ToggleLink from '../toggle-link/ToggleLink';
import { Box } from '@mui/material';

interface ToggleLinkProps {
  setIsInfoShown: (toggle: boolean) => void;
  isInfoShown: boolean;
}

const InfoLink = ({ setIsInfoShown, isInfoShown }: ToggleLinkProps) => {
  return (
    <Box sx={{ ml: 1 }}>
      <ToggleLink
        setToggle={setIsInfoShown}
        toggle={isInfoShown}
        toggledText="Hide Page Info"
        untoggledText="Show Page Info"
      />
    </Box>
  );
};

export default InfoLink;
