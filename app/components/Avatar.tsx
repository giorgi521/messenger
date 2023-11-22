'use client'
import { User } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

interface AvatarProps {
   user:User
}

const Avatar: React.FC<AvatarProps> = ({
    user
}) => {
    return (
        <div className='relative'>
            <div className='relative h-9 w-9 inline-block rounded-full overflow-hidden md:w-11 md:h-11'>
                <Image src={ user?.image || "/images/placeholder.jpg"} alt="placeholder" fill/>
            </div>
            <span 
              className='absolute rounded-full block bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3'            
            />
        </div>
    );
};

export default Avatar;