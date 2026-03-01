import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  labelStyle?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  className,
  labelStyle,
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="form-control w-full mb-4">
      {label && (
        <label className="label py-1">
          <span
            className={cn(
              'label-text text-base text-primary font-semibold',
              labelStyle,
            )}
          >
            {label}
          </span>
        </label>
      )}

      <div className="relative">
        <input
          type={isPassword && showPassword ? 'text' : type}
          className={cn(
            'input input-bordered w-full h-12 rounded-xl focus:outline-none focus:ring-2 bg-white',
            error
              ? 'input-error focus:ring-error'
              : 'focus:border-secondary focus:ring-secondary/20',
            className,
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        )}
      </div>

      {error && (
        <label className="label py-1">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};
