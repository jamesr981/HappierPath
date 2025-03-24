import ToggleLink from '../toggle-link/ToggleLink';

interface ToggleLinkProps {
  setIsInfoShown: (toggle: boolean) => void;
  isInfoShown: boolean;
}

const InfoLink = ({ setIsInfoShown, isInfoShown }: ToggleLinkProps) => {
  return (
    <div className="infoLink">
      <ToggleLink
        setToggle={setIsInfoShown}
        toggle={isInfoShown}
        toggledText="Hide Page Info"
        untoggledText="Show Page Info"
      />
    </div>
  );
};

export default InfoLink;
