import clsx from 'clsx';
import React from 'react';

interface ButtonProps {
    children?: React.ReactNode;
    fullWidth?: boolean;
    danger?: boolean;
    type?:'button' | 'submit' | 'reset' | undefined;
    onClick?: () => void;
    disabled?: boolean;
    secondary?: boolean;
}

const Button:React.FC<ButtonProps> = ({
    children,
    fullWidth,
    danger,
    type,
    onClick,
    disabled,
    secondary
}) => {
    return (
        <button
         onClick={onClick}
         type={type}
         disabled={disabled}
         className={clsx(`
           flex justify-center hover:shadow hover:shadow-gray-300 rounded-md px-3 py-2 text-sm font-semibold
           focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
         `,
           disabled && 'opacity-50 cursor-not-allowed',
           fullWidth && 'w-full',
           secondary ? 'text-gray-900' : 'text-white',
           danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
           !secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
         )}
         >
            {children}
        </button>
    );
};

export default Button;