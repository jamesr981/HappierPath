import { useCallback, useEffect, useState } from 'react';
import { Link, Links } from '../../types/Link';
import { getStorageType } from '../../functions/setup';

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
    const json = JSON.stringify(jsonPaths);

    getStorageType().then((storage) => {
	storage.set({ json: json });
    });

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
    <div id="editPaths">
      <h2>Path Editor</h2>
      <button id="jsonRead" onClick={onJsonReadClick}>
        Read Path List
      </button>
      <button id="jsonWrite" onClick={onJsonWriteClick}>
        Write Path List
      </button>
      <p>
        Use the format "Name&gt;URL", with a new line separating each entry,
        e.g. "Example Name&gt;/example/path/". If you want your line to be a
        title (i.e. not go anywhere), make the path "0", e.g. "Example
        Title&gt;0".
      </p>
      <textarea
        id="jsonIO"
        value={editorText}
        onChange={(e) => setEditorText(e.target.value)}
      ></textarea>
    </div>
  );
};

export default PathEditor;
