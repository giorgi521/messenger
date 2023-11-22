"use client"

import useConveration from '@/app/hooks/useConversation';
import useRouts from '@/app/hooks/useRouts';
import React from 'react';
import MobileItem from './MobileItem';

const MobileFooter = () => {
    const routes = useRouts()
    const {isOpen} = useConveration()

    if(isOpen) {
        return null
    }
    return (
        <div className='fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t lg:hidden'>
           {routes.map((route)=>( 
              <MobileItem 
                key={route.label}
                href={route.href}
                active={route.isActive}
                onClick={route.onClick}
                label={route.label}
                icon={route.icon}
              />
           ))}
        </div>
    );
};

export default MobileFooter;