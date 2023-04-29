import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  //1
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
     home: true,
    data: {
      permission: 'view',
      resource: 'dashboard'
    },
  },
  //2
  {
    title: 'Profile',
    icon: 'fas fa-user-circle',
    link: '/pages/profile',
    data: {
      permission: 'view',
      resource: 'profile'
    },
  },
]