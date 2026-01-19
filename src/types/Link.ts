export type Link = {
  pathUrl: string;
  pathName: string;
  domainPattern?: string; // Optional domain regex pattern to filter context menu items
};

export type Links = {
  links: Link[];
};

export type Protocol = 'http://' | 'https://' | 'ftp://';
const ValidProtocols: Protocol[] = ['http://', 'https://', 'ftp://'];
export const IsProtocol = (value: string) => {
  return ValidProtocols.includes(value as Protocol);
};
