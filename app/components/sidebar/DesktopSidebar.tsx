"use client"

import useRouts from '@/app/hooks/useRouts';
import React, { useState } from 'react';
import DesktopItems from './DesktopItems';
import { User } from '@prisma/client';
import Avatar from '../Avatar';
import SettingsModal from './SettingsModal';
 
interface  DesktopSidebarProps {
  currentUser: User
}

const DesktopSidebar:React.FC<DesktopSidebarProps> = ({
  currentUser
}) => {
    const routes = useRouts();
    const [isOpen , setIsOpen] = useState(false)
    return (
      <>
        <SettingsModal
          currentUser={currentUser}
          isOpen={isOpen}
          onClose={()=>setIsOpen(false)}
        />
        <div className='hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r lg:flex lg:pb-4 lg:flex-col lg:justify-between'>
          <nav className='mt-4 flex flex-col justify-between'>
            <ul role="list" className='flex flex-col items-center space-y-1'>
               {routes.map((route) => (
                <DesktopItems
                    key={route.label}
                    href={route.href}
                    label={route.label}
                    icon={route.icon}
                    active={route.isActive}
                    onClick={route.onClick}
                 />
               ))}
            </ul>
          </nav>
          <nav className='mt-4 flex flex-col justify-between items-center'>
            <div onClick={()=>setIsOpen(true)}
            className='hover:opacity-75 cursor-pointer transition'
            >
              <Avatar user={currentUser}/>
            </div>
          </nav>
        </div>
        </>
    );
};

export default DesktopSidebar;