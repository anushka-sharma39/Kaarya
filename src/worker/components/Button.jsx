import React from 'react';
import { cn } from '../utils/cn';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none dark:focus:ring-offset-slate-900';
  
  const variants = {
    primary: 'bg-primary-700 text-white hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700',
    secondary: 'bg-sage-100 text-sage-900 hover:bg-sage-200 dark:bg-sage-800 dark:text-sage-50 dark:hover:bg-sage-700',
    outline: 'border-2 border-primary-700 text-primary-700 hover:bg-primary-50 dark:border-primary-500 dark:text-primary-500 dark:hover:bg-primary-950',
    ghost: 'text-sage-700 hover:bg-sage-100 dark:text-sage-300 dark:hover:bg-sage-800',
    danger: 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800'
  };

  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-base',
    lg: 'h-14 px-8 text-lg'
  };

  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
