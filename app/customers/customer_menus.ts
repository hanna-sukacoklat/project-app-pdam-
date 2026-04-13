import { Banknote, Home, Receipt, UserPen } from 'lucide-react';
import { title } from 'process';

export const items = [
    {
        title: 'home',
        url: '/customers/dashboard',
        icon: Home,
    },

    {
        title: 'profile',
        url: '/customers/profile',
        icon: UserPen,
    },

    { 
        title: 'Bill',
        url: '/customers/bills',
        icon: Receipt,
    }
];