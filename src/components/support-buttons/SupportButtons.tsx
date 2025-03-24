import LinkButton from '../link-button/LinkButton';

const SupportButtons = () => {
  return (
    <div id="support-buttons">
      <LinkButton
        buttonText="☕ Buy Me a Coffee"
        link="https://buymeacoffee.com/jreynolds"
      />
      <LinkButton
        buttonText="💻 Github"
        link="https://github.com/jamesr981/happierpath"
      />
    </div>
  );
};

export default SupportButtons;
