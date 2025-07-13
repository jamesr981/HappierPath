import { useEffect, useState } from 'react';
import { Links } from '../../types/Link';
import { saveLinksToStorage } from '../../functions/storage';
import { Paper, Typography, Button, TextField, Stack } from '@mui/material';
import { ConfirmationDialog, ErrorSnackbar } from '../common';
import { parseLinksFromText, formatLinksToText } from '../../utils/validation';
import { useDialog, useSnackbar } from '../../hooks';

interface PathEditorProps {
  links: Links;
  setLinks: (links: Links) => void;
}

const PathEditor = ({ links, setLinks }: PathEditorProps) => {
  const [editorText, setEditorText] = useState('');
  const [pendingLinks, setPendingLinks] = useState<Links | null>(null);
  
  const confirmDialog = useDialog();
  const errorSnackbar = useSnackbar();

  const onJsonWriteClick = () => {
    if (!editorText) return;

    const validationResult = parseLinksFromText(editorText);
    
    if (!validationResult.isValid) {
      errorSnackbar.showError(validationResult.errors.join('\n'));
      return;
    }

    const jsonPaths: Links = { links: validationResult.parsedLinks };
    setPendingLinks(jsonPaths);
    confirmDialog.open();
  };

  const handleConfirmWrite = () => {
    if (pendingLinks) {
      saveLinksToStorage(pendingLinks);
      setLinks(pendingLinks);
    }
    confirmDialog.close();
    setPendingLinks(null);
  };

  const handleCancelWrite = () => {
    confirmDialog.close();
    setPendingLinks(null);
  };

  const onJsonReadClick = () => {
    const linkString = formatLinksToText(links.links);
    setEditorText(linkString);
  };

  useEffect(() => {
    const linkString = formatLinksToText(links.links);
    setEditorText(linkString);
  }, [links]);

  return (
    <>
      <Paper sx={{ p: '8px', mb: 2 }} elevation={1}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 600, mb: 0.5, fontSize: 15 }}
        >
          Path Editor
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={onJsonReadClick}
          >
            Read Path List
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onJsonWriteClick}
          >
            Write Path List
          </Button>
        </Stack>
        <Typography variant="body2" sx={{ mb: 1, whiteSpace: 'pre-line' }}>
          {`Heading - This is a heading>0
Link - This is a link>/example/path`}
        </Typography>
        <TextField
          
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

      <ConfirmationDialog
        open={confirmDialog.isOpen}
        title="Confirm Path List Update"
        message="This will replace your existing stored values with your new values in the edit box.\n\nAre you sure you want to continue?"
        onConfirm={handleConfirmWrite}
        onCancel={handleCancelWrite}
        severity="warning"
      />

      <ErrorSnackbar
        open={errorSnackbar.isOpen}
        message={errorSnackbar.message}
        severity={errorSnackbar.severity}
        onClose={errorSnackbar.close}
      />
    </>
  );
};

export default PathEditor;
