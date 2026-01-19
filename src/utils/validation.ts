import { Link } from '../types/Link';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  parsedLinks: Link[];
}

export const validateLinkFormat = (
  input: string,
  lineNumber: number
): string | null => {
  if (input.trim() === '') return null; // Skip empty lines

  if (input.indexOf('>', 0) < 1) {
    return `Line ${lineNumber}: Malformed link - missing '>' separator`;
  }

  const inputPair = input.split('>');
  if (inputPair.length !== 2) {
    return `Line ${lineNumber}: Invalid format - expected exactly one '>' separator`;
  }

  if (!inputPair[0].trim()) {
    return `Line ${lineNumber}: Missing link name`;
  }

  if (!inputPair[1].trim()) {
    return `Line ${lineNumber}: Missing link URL`;
  }

  // Validate domain pattern if present (format: pathUrl@domainPattern)
  const urlPart = inputPair[1].trim();
  if (urlPart.includes('@')) {
    const atIndex = urlPart.lastIndexOf('@');
    const domainPattern = urlPart.substring(atIndex + 1).trim();

    if (!domainPattern) {
      return `Line ${lineNumber}: Empty domain pattern after '@'`;
    }

    // Try to validate regex pattern
    try {
      new RegExp(domainPattern);
    } catch (e) {
      return `Line ${lineNumber}: Invalid domain pattern regex - ${e instanceof Error ? e.message : 'unknown error'}`;
    }
  }

  return null;
};

export const parseLinksFromText = (text: string): ValidationResult => {
  const arrayInput = text.split('\n');
  const parsedLinks: Link[] = [];
  const errors: string[] = [];

  arrayInput.forEach((input, index) => {
    const lineNumber = index + 1;
    const error = validateLinkFormat(input, lineNumber);

    if (error) {
      errors.push(error);
      return;
    }

    if (input.trim() === '') return; // Skip empty lines

    const inputPair = input.split('>');
    const pathName = inputPair[0].trim();
    const urlPart = inputPair[1].trim();

    // Check if domain pattern is specified (format: pathUrl@domainPattern)
    let pathUrl = urlPart;
    let domainPattern: string | undefined = undefined;

    if (urlPart.includes('@')) {
      const atIndex = urlPart.lastIndexOf('@');
      pathUrl = urlPart.substring(0, atIndex).trim();
      domainPattern = urlPart.substring(atIndex + 1).trim();
    }

    const link: Link = {
      pathName,
      pathUrl,
    };

    if (domainPattern) {
      link.domainPattern = domainPattern;
    }

    parsedLinks.push(link);
  });

  return {
    isValid: errors.length === 0,
    errors,
    parsedLinks,
  };
};

export const formatLinksToText = (links: Link[]): string => {
  return links
    .map((link) => {
      const base = `${link.pathName}>${link.pathUrl}`;
      return link.domainPattern ? `${base}@${link.domainPattern}` : base;
    })
    .join('\n');
};
