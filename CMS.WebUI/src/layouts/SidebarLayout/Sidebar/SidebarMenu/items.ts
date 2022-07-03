import { ReactNode } from 'react';

import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import MmsTwoToneIcon from '@mui/icons-material/MmsTwoTone';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone';
import BeachAccessTwoToneIcon from '@mui/icons-material/BeachAccessTwoTone';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import FilterVintageTwoToneIcon from '@mui/icons-material/FilterVintageTwoTone';
import HowToVoteTwoToneIcon from '@mui/icons-material/HowToVoteTwoTone';
import LocalPharmacyTwoToneIcon from '@mui/icons-material/LocalPharmacyTwoTone';
import RedeemTwoToneIcon from '@mui/icons-material/RedeemTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import TrafficTwoToneIcon from '@mui/icons-material/TrafficTwoTone';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';

import PeopleAltIconTwoToneIcon from '@mui/icons-material/PeopleAlt';
import StoreIcon from '@mui/icons-material/Store';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import WorkIcon from '@mui/icons-material/Work';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import SupervisorAccountTwoToneIcon from '@mui/icons-material/SupervisorAccountTwoTone';
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
import StreetviewTwoToneIcon from '@mui/icons-material/StreetviewTwoTone';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import FlagTwoToneIcon from '@mui/icons-material/FlagTwoTone';
import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import AssistantTwoToneIcon from '@mui/icons-material/AssistantTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone';
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import ContactsTwoToneIcon from '@mui/icons-material/ContactsTwoTone';
import CardMembershipTwoToneIcon from '@mui/icons-material/CardMembershipTwoTone';
import AddBusinessTwoToneIcon from '@mui/icons-material/AddBusinessTwoTone';

export interface MenuItem {
  hidden?: boolean;
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
    heading: string;
    hidden?: boolean;
}

const menuItems: MenuItems[] = [
    {
        heading: 'Management',
        items: [
            {
                name: 'Lecture',
                icon: PeopleAltIconTwoToneIcon,
                link: '/management/lecture'
            },
        ]
    },
];


//const menuItems: MenuItems[] = [
//    {
//        heading: 'login',
//        items: [
//            {
//                name: 'Login',
//                link: '/login',
//                icon: DesignServicesTwoToneIcon
//            }
//        ]
//    },
//  {
//    heading: '',
//    items: [
//      {
//        name: 'Overview',
//        link: '/overview',
//        icon: DesignServicesTwoToneIcon
//      }
//    ]
//  },
//  {
//    heading: 'Dashboards',
//    items: [
//      {
//        name: 'Crypto',
//        link: '/dashboards/crypto',
//        icon: BrightnessLowTwoToneIcon
//      },
//      {
//        name: 'Messenger',
//        icon: MmsTwoToneIcon,
//        link: '/dashboards/messenger'
//      },
//    ]
//  },
//  {
//    heading: 'Management',
//    items: [
//      {
//        name: 'Transactions',
//        icon: TableChartTwoToneIcon,
//        link: '/management/transactions'
//      },
//      {
//        name: 'User Profile',
//        icon: AccountCircleTwoToneIcon,
//        link: '/management/profile',
//        items: [
//          {
//            name: 'Profile Details',
//            link: '/management/profile/details'
//          },
//          {
//            name: 'User Settings',
//            link: '/management/profile/settings'
//          }
//        ]
//      }
//    ]
//    },
//    {
//        heading: 'Security',
//        items: [
//            {
//                name: 'Users',
//                icon: BallotTwoToneIcon,
//                link: '/components/users/userstable'
//            },
//            {
//                name: 'Role',
//                icon: BeachAccessTwoToneIcon,
//                link: '/components/modals'
//            },
//            {
//                name: 'Role Access',
//                icon: BeachAccessTwoToneIcon,
//                link: '/components/modals'
//            },
//        ]
//    },
//  {
//    heading: 'Components',
//    items: [
//      {
//        name: 'Buttons',
//        icon: BallotTwoToneIcon,
//        link: '/components/buttons'
//      },
//      {
//        name: 'Modals',
//        icon: BeachAccessTwoToneIcon,
//        link: '/components/modals'
//      },
//      {
//        name: 'Accordions',
//        icon: EmojiEventsTwoToneIcon,
//        link: '/components/accordions'
//      },
//      {
//        name: 'Tabs',
//        icon: FilterVintageTwoToneIcon,
//        link: '/components/tabs'
//      },
//      {
//        name: 'Badges',
//        icon: HowToVoteTwoToneIcon,
//        link: '/components/badges'
//      },
//      {
//        name: 'Tooltips',
//        icon: LocalPharmacyTwoToneIcon,
//        link: '/components/tooltips'
//      },
//      {
//        name: 'Avatars',
//        icon: RedeemTwoToneIcon,
//        link: '/components/avatars'
//      },
//      {
//        name: 'Cards',
//        icon: SettingsTwoToneIcon,
//        link: '/components/cards'
//      },
//      {
//        name: 'Forms',
//        icon: TrafficTwoToneIcon,
//        link: '/components/forms'
//      },
//    ]
//  },
//  {
//    heading: 'Extra Pages',
//    items: [
//      {
//        name: 'Status',
//        icon: VerifiedUserTwoToneIcon,
//        link: '/status',
//        items: [
//          {
//            name: 'Error 404',
//            link: '/status/404'
//          },
//          {
//            name: 'Error 500',
//            link: '/status/500'
//          },
//          {
//            name: 'Maintenance',
//            link: '/status/maintenance'
//          },
//          {
//            name: 'Coming Soon',
//            link: '/status/coming-soon'
//          }
//        ]
//      }
//    ]
//  }
//];

export default menuItems;
