export type Link = {
  pathUrl: string;
  pathName: string;
};

export type Links = {
  links: Link[];
};

export type Protocol = 'http://' | 'https://' | 'ftp://';
const ValidProtocols: Protocol[] = ['http://', 'https://', 'ftp://'];
export const IsProtocol = (value: string) => {
  return ValidProtocols.includes(value as Protocol);
};
