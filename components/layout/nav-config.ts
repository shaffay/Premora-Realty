export type NavItem = {
  href: string;
  labelKey: keyof NavLabels;
};

type NavLabels = {
  home: string;
  properties: string;
  communities: string;
  about: string;
  services: string;
  investment: string;
  contact: string;
};

export const mainNav: NavItem[] = [
  { href: '/', labelKey: 'home' },
  { href: '/properties', labelKey: 'properties' },
  { href: '/communities', labelKey: 'communities' },
  { href: '/services', labelKey: 'services' },
  { href: '/investment', labelKey: 'investment' },
  { href: '/about', labelKey: 'about' },
  { href: '/contact', labelKey: 'contact' },
];

export const exploreNav: NavItem[] = [
  { href: '/properties', labelKey: 'properties' },
  { href: '/communities', labelKey: 'communities' },
  { href: '/investment', labelKey: 'investment' },
  { href: '/about', labelKey: 'about' },
  { href: '/contact', labelKey: 'contact' },
];
