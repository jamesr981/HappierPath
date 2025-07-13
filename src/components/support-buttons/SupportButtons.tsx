import LinkButton from '../link-button/LinkButton';
import { Stack } from '@mui/material';

const SupportButtons = () => {
  return (
    <Stack direction="row" spacing={1}>
      <LinkButton
        buttonText="☕ Buy Me a Coffee"
        link="https://buymeacoffee.com/jreynolds"
      />
      <LinkButton
        buttonText="💻 Github"
        link="https://github.com/jamesr981/happierpath"
      />
    </Stack>
  );
};

export default SupportButtons;
