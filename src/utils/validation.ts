import { Link } from '../types/Link';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  parsedLinks: Link[];
}

export const validateLinkFormat = (input: string, lineNumber: number): string | null => {
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
    parsedLinks.push({ 
      pathName: inputPair[0].trim(), 
      pathUrl: inputPair[1].trim() 
    });
  });

  return {
    isValid: errors.length === 0,
    errors,
    parsedLinks
  };
};

export const formatLinksToText = (links: Link[]): string => {
  return links
    .map(link => `${link.pathName}>${link.pathUrl}`)
    .join('\n');
}; 