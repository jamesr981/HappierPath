import { Link } from '../../types/Link';
import { Button } from '@mui/material';

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
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newTab: boolean
  ) => {
    event.preventDefault();
    const dataUrl = event.currentTarget.getAttribute('data-url');
    if (!dataUrl || !url) return;
    onNavigateLinkClick(dataUrl, newTab, url);
  };

  // Title row (special handling)
  if (link.pathUrl === '0') {
    return { isTitle: true, content: link.pathName };
  }

  // Regex-based
  if (link.pathUrl.includes('<<<')) {
    const [regexPattern, replacePattern] = link.pathUrl.split('<<<');
    const regex = new RegExp(regexPattern, 'gi');

    if (link.pathUrl.match(regex)) {
      const newPath = link.pathUrl.replace(regex, replacePattern);
      return {
        isTitle: false,
        content: (
          <>
            <Button
              variant="text"
              color="primary"
              size="small"
              data-url={newPath}
              onClick={(event) => onLinkClick(event, false)}
              sx={{
                minWidth: 0,
                mr: '4px',
                textTransform: 'none',
                lineHeight: 1,
                p: 0,
                fontSize: 13,
                color: 'primary.main',
                background: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                  background: 'none',
                },
              }}
            >
              ${link.pathName}
            </Button>
            <Button
              variant="text"
              color="success"
              size="small"
              data-url={newPath}
              onClick={(event) => onLinkClick(event, true)}
              sx={{
                minWidth: 0,
                textTransform: 'none',
                lineHeight: 1,
                p: 0,
                fontSize: 13,
                color: 'success.main',
                background: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                  background: 'none',
                },
              }}
            >
              +tab
            </Button>
          </>
        ),
      };
    }
  }

  // Standard Paths
  return {
    isTitle: false,
    content: (
      <>
        <Button
          variant="text"
          color="primary"
          size="small"
          data-url={link.pathUrl}
          onClick={(event) => onLinkClick(event, false)}
          sx={{
            minWidth: 0,
            mr: '4px',
            textTransform: 'none',
            lineHeight: 1,
            p: 0,
            fontSize: 13,
            color: 'primary.main',
            background: 'none',
            '&:hover': {
              textDecoration: 'underline',
              background: 'none',
            },
          }}
        >
          {link.pathName}
        </Button>
        <Button
          variant="text"
          color="success"
          size="small"
          data-url={link.pathUrl}
          onClick={(event) => onLinkClick(event, true)}
          sx={{
            minWidth: 0,
            textTransform: 'none',
            lineHeight: 1,
            p: 0,
            fontSize: 13,
            color: 'success.main',
            background: 'none',
            '&:hover': {
              textDecoration: 'underline',
              background: 'none',
            },
          }}
        >
          +tab
        </Button>
      </>
    ),
  };
};

export default PathListLink;
