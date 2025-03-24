interface LinkButtonProps {
  link: string;
  buttonText: string;
}

const LinkButton = ({ link, buttonText }: LinkButtonProps) => {
  const onButtonClick = function () {
    chrome.tabs.create({ url: link });
  };
  return <button onClick={onButtonClick} style={{marginRight:"8px"}}>{buttonText}</button>;
};

export default LinkButton;
