"use client"
import { User } from '@prisma/client';
import React from 'react';
import UsersBox from './UserBox';

interface userListProps {
    items:User[]
}

const UserList:React.FC<userListProps> = ({
    items
}) => {
    return (
       <aside className='fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-gray-200 block w-full left-0'>
            <div className='px-5'>
               <div className='flex-col'>
                  <div className='text-2xl font-bold text-natural-800 py-4'>
                    People
                  </div>
               </div>
               {items.map((item)=>(
                <UsersBox 
                 key={item.id}
                 data={item}
                />
               ))}
            </div>
       </aside>
    );
};

export default UserList;