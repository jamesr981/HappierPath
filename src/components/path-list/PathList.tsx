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
    <Paper sx={{ p: '4px', mb: 1 }} elevation={1}>
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 600, mb: 0.25, fontSize: 14 }}
      >
        Select your path:
      </Typography>
      <List dense disablePadding>
        {links.map((link, index) => {
          const result = PathListLink({ link, url, onNavigateLinkClick });
          if (result.isTitle) {
            return (
              <ListItem key={index} disableGutters sx={{ pl: 0, py: 0.05 }}>
                <Typography
                  variant="body2"
                  sx={(theme) => {return { fontWeight: 700, color: theme.palette.text.secondary, fontSize: 13, mt:'6px' }}}
                >
                  {result.content}
                </Typography>
              </ListItem>
            );
          }
          return (
            <ListItem key={index} disableGutters sx={{ pl: 0, py: 0.05 }}>
              {result.content}
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default PathList;
