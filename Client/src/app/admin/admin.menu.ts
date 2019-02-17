import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'ADMINISTRACION',
    group: true,
  },
  {
    title: 'Policies',
    icon: 'nb-home',
    link: '/admin/policies',
    home: true,
  },
  {
    title: 'New Policy',
    icon: 'nb-keypad',
    link: '/admin/new',
    home: false,
  },
  {
    title: 'Clients',
    icon: 'nb-person',
    link: '/admin/clients',
    home: false,
  },
];
