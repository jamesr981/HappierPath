import { useCallback, useEffect, useState } from 'react';
import { Link, Links } from '../../types/Link';
import { saveLinksToStorage } from '../../functions/storage';
import { Paper, Typography, Button, TextField, Stack } from '@mui/material';

interface PathEditorProps {
  links: Links;
  setLinks: (links: Links) => void;
}

const PathEditor = ({ links, setLinks }: PathEditorProps) => {
  const [editorText, setEditorText] = useState('');
  const onJsonWriteClick = () => {
    // If there is no editor text, do nothing
    if (!editorText) return;

    if (
      !confirm(
        'This will replace your existing stored values with your new values in the edit box.\n\n Are you sure?'
      )
    ) {
      return;
    }

    const arrayInput = editorText.split('\n');
    const links: Link[] = arrayInput
      .map((input, index) => {
        const count = index + 1;
        if (input.indexOf('>', 0) < 1) {
          alert(`Link on line ${count} malformed - ignored!`);
          return;
        }

        const inputPair = input.split('>');
        return { pathName: inputPair[0], pathUrl: inputPair[1] };
      })
      .filter((z) => !!z);

    const jsonPaths: Links = { links: links };

    saveLinksToStorage(jsonPaths);
    setLinks(jsonPaths);
  };

  const getLinkString = useCallback(() => {
    let stringLinks = '';
    links.links.forEach((link) => {
      stringLinks += `${link.pathName}>${link.pathUrl}\n`;
    });

    return stringLinks.substring(0, stringLinks.length - 1);
  }, [links]);

  const onJsonReadClick = () => {
    const linkString = getLinkString();
    setEditorText(linkString);
  };

  useEffect(() => {
    const linkString = getLinkString();
    setEditorText(linkString);
  }, [links, getLinkString]);

  return (
    <Paper sx={{ p: 2, mb: 2 }} elevation={2} id="editPaths">
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        Path Editor
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={onJsonReadClick}
          id="jsonRead"
        >
          Read Path List
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onJsonWriteClick}
          id="jsonWrite"
        >
          Write Path List
        </Button>
      </Stack>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Heading - This is a heading&gt;0
        <br />
        Link - This is a link&gt;/example/path
      </Typography>
      <TextField
        id="jsonIO"
        value={editorText}
        onChange={(e) => setEditorText(e.target.value)}
        multiline
        minRows={8}
        maxRows={16}
        fullWidth
        variant="outlined"
        sx={{ fontFamily: 'monospace', fontSize: 13 }}
      />
    </Paper>
  );
};

export default PathEditor;
