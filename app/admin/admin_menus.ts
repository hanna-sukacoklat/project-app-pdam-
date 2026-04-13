import {Home, User, UserPen, Users, Toolbox, Receipt, Banknote} from 'lucide-react';

export const items = [
    {
        title: 'home',
        url: '/admin/dashboard',
        icon: Home,
    },
    {
        title: 'atmin data',
        url: '/admin/atmindata',
        icon: User,
    },
    {
        title: 'profile atmin',
        url: '/admin/profileatmin',
        icon: UserPen,
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
        url: '/admin/bills',
        icon: Receipt,
    },
    {
        title: 'Payments',
        url: '/admin/payments',
        icon: Banknote,
    },
];

