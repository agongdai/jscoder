import {
  faChartMixedUpCircleDollar,
  faCoins,
  faDisplayChartUpCircleDollar,
  faDroplet,
  faGauge,
  faHammerBrush,
  faLandmarkDome,
  faPalette,
  faScrewdriverWrench,
  faSliders,
  faUserRobotXmarks,
  faWallet,
} from '@fortawesome/pro-duotone-svg-icons';
import { IMenu } from '@joy/types/common';

const menus: IMenu[] = [
  {
    title: 'Dashboard',
    icon: faGauge,
    href: '/',
  },
  {
    title: 'Markets',
    icon: faChartMixedUpCircleDollar,
    href: '/markets',
  },
  {
    title: 'Assets',
    icon: faCoins,
    href: '/assets',
    protected: true,
  },
  {
    title: 'Analysis',
    icon: faDisplayChartUpCircleDollar,
    href: '/analysis',
    protected: true,
  },
  {
    title: 'Robot',
    icon: faUserRobotXmarks,
    href: '/robot',
    protected: true,
  },
  {
    title: 'Settings',
    icon: faScrewdriverWrench,
    href: '/settings',
    protected: true,
    subMenus: [
      { title: 'Exchanges', icon: faLandmarkDome, href: '/exchanges' },
      { title: 'Wallets', icon: faWallet, href: '/wallets' },
      { title: 'Parameters', icon: faSliders, href: '/parameters' },
      { title: 'Theme', icon: faPalette, href: '/theme' },
    ],
  },
  {
    title: 'Admin',
    icon: faHammerBrush,
    href: '/admin',
    protected: true,
    adminOnly: true,
    subMenus: [
      { title: 'Color Variables', icon: faDroplet, href: '/color-variables' },
      { title: 'Coins', icon: faCoins, href: '/coins' },
    ],
  },
];

export default menus;
