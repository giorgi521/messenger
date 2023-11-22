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
    const { conversationId } = useConveration();

    const routes = useMemo(() => [
        {
           label: 'Chats',
           href: '/conversations',
           icon: HiChat,
           isActive: pathName === '/conversations' || !!conversationId
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
    [conversationId,pathName])

    return routes
}

export default useRouts;
