"use client"

import React, { useState } from 'react';
import {fullCoverstationType} from '@/app/types/index';
import { useRouter } from 'next/navigation';
import useConveration from '@/app/hooks/useConversation';
import clsx from 'clsx';
import { MdOutlineGroupAdd } from 'react-icons/md';
import ConversationBox from './ConversationBox';
import GroupChatModal from './GroupChatModal';
import { User } from '@prisma/client';

interface ConversationListProps{
    initialItems:fullCoverstationType[]
    users:User[]
}

const ConversationList:React.FC<ConversationListProps> = ({
    initialItems,
    users
}) => {
    const [items,setItems] = useState(initialItems)
    const [isModalOpen,setIsModalOpen] = useState(false)
    const router = useRouter()

    const {
        conversationId,
        isOpen
    } = useConveration()
    return (
        <>
        <GroupChatModal 
          users={users}
          isOpen={isModalOpen}
          onClose={()=>setIsModalOpen(false)}

        />
        <aside className={clsx(`fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`,
         isOpen ? 'hidden' : 'block w-full left-0'
        )}>
           <div className='px-5'>
            <div className='flex justify-between mb-4 pt-4'>
               <div className='text-2xl font-bold text-neatral'>
                 Messages
               </div>
               <div onClick={()=> setIsModalOpen(true)} className='p-2 rounded-full cursor-pointer bg-gray-100 text-gray-600 hover:opacity-75 transition'>
                    <MdOutlineGroupAdd size={20}/>
               </div>
            </div>
            {items.map((item) => (
               <ConversationBox
                 key={item.id}
                 data={item}
                 selected={conversationId === item.id}
               />
            ))}
           </div>
        </aside>
        </>
    );
};

export default ConversationList;