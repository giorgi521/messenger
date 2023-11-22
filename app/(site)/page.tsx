import Image from 'next/image';
import React from 'react';
import AutoForm from './components/AutoForm';

const page = () => {
    return (
        <div className='bg-grey-100 flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                 <Image
                   src="/images/logo.png"
                   alt='logo'
                   height="48"
                   width="48"
                   className='mx-auto w-auto'
                 />
                 <h2 className='text-center text-3xl font-bold tracking-tighter text-gray-900 mt-6'>
                    Sign in to your account
                 </h2>
            </div>
            <AutoForm />
        </div>
    );
};

export default page;