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
    icon: 'nb-home',
    link: '/admin/new',
    home: true,
  },
];
