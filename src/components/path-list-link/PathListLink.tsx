import { Link } from '../../types/Link';

interface PathListLinkProps {
  link: Link;
  url: URL | null;
  onNavigateLinkClick: (
    dataUrl: string | null,
    newTab: boolean,
    url: URL
  ) => void;
}

const PathListLink = ({
  link,
  url,
  onNavigateLinkClick,
}: PathListLinkProps) => {
  const onLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    newTab: boolean
  ) => {
    event.preventDefault();
    const dataUrl = event.currentTarget.getAttribute('data-url');
    if (!dataUrl || !url) return;
    onNavigateLinkClick(dataUrl, newTab, url);
  };

  //Title
  if (link.pathUrl === '0') {
    return <li className="listTitle">{link.pathName}</li>;
  }

  //regex-based
  if (link.pathUrl.includes('<<<')) {
    const [regexPattern, replacePattern] = link.pathUrl.split('<<<');
    const regex = new RegExp(regexPattern, 'gi');

    if (link.pathUrl.match(regex)) {
      const newPath = link.pathUrl.replace(regex, replacePattern);
      return (
        <li>
          <a
            href="#"
            className="sameTabLink"
            data-url={newPath}
            onClick={(event) => onLinkClick(event, false)}
          >
            ${link.pathName}
          </a>
          <a
            href="#"
            className="newTabLink"
            data-url={newPath}
            onClick={(event) => onLinkClick(event, true)}
          >
            +tab
          </a>
        </li>
      );
    }
  }

  //Standad Paths
  return (
    <li>
      <a
        href="#"
        className="sameTabLink"
        data-url={link.pathUrl}
        onClick={(event) => onLinkClick(event, false)}
      >
        {link.pathName}
      </a>
      <a
        href="#"
        className="newTabLink"
        data-url={link.pathUrl}
        onClick={(event) => onLinkClick(event, true)}
      >
        +tab
      </a>
    </li>
  );
};

export default PathListLink;
