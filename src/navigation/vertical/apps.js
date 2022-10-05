// ** Icons Import
import {
  Mail,
  MessageSquare,
  CheckSquare,
  Calendar,
  FileText,
  Circle,
  ShoppingCart,
  User,
  Shield,
  Edit,
  List,
  Users
} from 'react-feather'

export default [
  {
    header: 'Projects'
  },
  {
    id: 'addNewProject',
    title: 'Add New Project',
    icon: <Edit size={20} />,
    navLink: '/apps/admin/projects/addnewproject'
  },
  {
    id: 'viewProjects',
    title: 'View Projects',
    icon: <List size={20} />,
    navLink: '/apps/admin/projects/viewProjects'
  },
  {
    header: 'Developers'
  },
  {
    id: 'viewDevelopers',
    title: ' Developers',
    icon: <Users size={20} />,
    navLink: '/apps/admin/developers/viewDevelopers'
  },
//   {
//     header: 'Apps & Pages'
//   },
//   {
//     id: 'email',
//     title: 'Email',
//     icon: <Mail size={20} />,
//     navLink: '/apps/email'
//   },
//   {
//     id: 'chat',
//     title: 'Chat',
//     icon: <MessageSquare size={20} />,
//     navLink: '/apps/chat'
//   },
//   {
//     id: 'todo',
//     title: 'Todo',
//     icon: <CheckSquare size={20} />,
//     navLink: '/apps/todo'
//   },
//   {
//     id: 'calendar',
//     title: 'Calendar',
//     icon: <Calendar size={20} />,
//     navLink: '/apps/calendar'
//   },
//   {
//     id: 'invoiceApp',
//     title: 'Invoice',
//     icon: <FileText size={20} />,
//     children: [
//       {
//         id: 'invoiceList',
//         title: 'List',
//         icon: <Circle size={12} />,
//         navLink: '/apps/invoice/list'
//       },
//       {
//         id: 'invoicePreview',
//         title: 'Preview',
//         icon: <Circle size={12} />,
//         navLink: '/apps/invoice/preview'
//       },
//       {
//         id: 'invoiceEdit',
//         title: 'Edit',
//         icon: <Circle size={12} />,
//         navLink: '/apps/invoice/edit'
//       },
//       {
//         id: 'invoiceAdd',
//         title: 'Add',
//         icon: <Circle size={12} />,
//         navLink: '/apps/invoice/add'
//       }
//     ]
//   },

//   {
//     id: 'roles-permissions',
//     title: 'Roles & Permissions',
//     icon: <Shield size={20} />,
//     children: [
//       {
//         id: 'roles',
//         title: 'Roles',
//         icon: <Circle size={12} />,
//         navLink: '/apps/roles'
//       },
//       {
//         id: 'permissions',
//         title: 'Permissions',
//         icon: <Circle size={12} />,
//         navLink: '/apps/permissions'
//       }
//     ]
//   },
//   {
//     id: 'eCommerce',
//     title: 'eCommerce',
//     icon: <ShoppingCart size={20} />,
//     children: [
//       {
//         id: 'shop',
//         title: 'Shop',
//         icon: <Circle size={12} />,
//         navLink: '/apps/ecommerce/shop'
//       },
//       {
//         id: 'detail',
//         title: 'Details',
//         icon: <Circle size={12} />,
//         navLink: '/apps/ecommerce/product-detail'
//       },
//       {
//         id: 'wishList',
//         title: 'Wish List',
//         icon: <Circle size={12} />,
//         navLink: '/apps/ecommerce/wishlist'
//       },
//       {
//         id: 'checkout',
//         title: 'Checkout',
//         icon: <Circle size={12} />,
//         navLink: '/apps/ecommerce/checkout'
//       }
//     ]
//   },
//   {
//     id: 'users',
//     title: 'User',
//     icon: <User size={20} />,
//     children: [
//       {
//         id: 'list',
//         title: 'List',
//         icon: <Circle size={12} />,
//         navLink: '/apps/user/list'
//       },
//       {
//         id: 'view',
//         title: 'View',
//         icon: <Circle size={12} />,
//         navLink: '/apps/user/view'
//       }
//     ]
//   }
// ]
]
