import {Home, User, UserPen, Users, Toolbox, Receipt, Banknote} from 'lucide-react';

export const items = [
    {
        title: 'home',
        url: '/admin/dashboard',
        icon: Home,
    },
    {
        title: 'my profile',
        url: '/admin/profile',
        icon: UserPen,
    },
    {
        title: 'Admin Data',
        url: '/admin/data',
        icon: User,
    },
    {
        title: 'Customers Data',
        url: '/admin/customers',
        icon: Users,
    },
    {
        title: 'Services',
        url: '/admin/service',
        icon: Toolbox,
    },
    { 
        title: 'Bill',
        url: '#',
        icon: Receipt,
    },
    {
        title: 'Payments',
        url: '/admin/payments',
        icon: Banknote,
    },
];

