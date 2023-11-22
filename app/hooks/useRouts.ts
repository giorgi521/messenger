"use client"

import {useMemo} from 'react'
import {usePathname} from 'next/navigation'
import {HiChat} from 'react-icons/hi';
import {
    HiUsers,
    HiArrowLeftOnRectangle
} from 'react-icons/hi2';
import { signOut } from 'next-auth/react'
import useConveration from './useConversation';

const useRouts =()=> {
    const pathName = usePathname();
    const { converationId } = useConveration();

    const routes = useMemo(() => [
        {
           label: 'Chats',
           href: '/conversations',
           icon: HiChat,
           isActive: pathName === '/conversations' || !!converationId
        },
        {
            label:'Users',
            href:'/users',
            icon:HiUsers,
            isActive: pathName === '/users'
        },
        {
            label:'Logout',
            href:'#',
            icon:HiArrowLeftOnRectangle,
            onClick:()=> signOut(),
        }
      ],
    [converationId,pathName])

    return routes
}

export default useRouts;
