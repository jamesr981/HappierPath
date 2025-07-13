import PathListLink from '../path-list-link/PathListLink';
import { Link } from '../../types/Link';
import { Paper, Typography, List, ListItem } from '@mui/material';

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
    <Paper sx={{ p: '8px', mb: 2 }} elevation={1} id="pathList">
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, fontSize: 15 }}>
        Select your path:
      </Typography>
      <List dense disablePadding>
        {links.map((link, index) => {
          const result = PathListLink({ link, url, onNavigateLinkClick });
          if (result.isTitle) {
            return (
              <ListItem key={index} disableGutters sx={{ pl: 0, py: 0.1 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#444' }}>
                  {result.content}
                </Typography>
              </ListItem>
            );
          }
          return (
            <ListItem key={index} disableGutters sx={{ pl: 0, py: 0.1 }}>
              {result.content}
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default PathList;
