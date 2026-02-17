import React from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'social' | 'ghost';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  isLoading = false,
  className,
  ...props
}) => {
  const variants = {
    primary: 'btn-primary text-white',
    outline: 'btn-outline btn-primary',
    social: 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: 'btn-ghost text-primary',
  };

  return (
    <button
      className={cn(
        'btn min-h-[3rem] h-12 px-6 font-title font-semibold rounded-xl normal-case text-base',
        variants[variant],
        fullWidth && 'w-full',
        className,
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        children
      )}
    </button>
  );
};
