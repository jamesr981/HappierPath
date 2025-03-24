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
    <span id="togglePathEditor">
      <a href="#" onClick={() => setToggle(!toggle)}>
        {toggle ? toggledText : untoggledText}
      </a>
    </span>
  );
};

export default ToggleLink;
