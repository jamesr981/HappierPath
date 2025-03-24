import PathListLink from '../path-list-link/PathListLink';
import { Link } from '../../types/Link';

interface PathListProps {
  url: URL | null;
  links: Link[];
  onNavigateLinkClick: (
    dataUrl: string | null,
    newTab: boolean,
    url: URL
  ) => void;
}

const PathList = ({ links, url, onNavigateLinkClick }: PathListProps) => {
  return (
    <div id="pathList">
      <h2>Select your path:</h2>
      <ul>
        {links.map((link, index) => (
          <PathListLink
            link={link}
            key={index}
            onNavigateLinkClick={onNavigateLinkClick}
            url={url}
          />
        ))}
      </ul>
    </div>
  );
};

export default PathList;
