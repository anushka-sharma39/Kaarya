import React from 'react';
import { cn } from '../utils/cn';
import { User } from 'lucide-react';

const Avatar = ({ src, alt, size = 'md', className, fallback }) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24'
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center overflow-hidden rounded-full bg-sage-200 dark:bg-sage-800", sizes[size], className)}>
      {src ? (
        <img src={src} alt={alt || 'Avatar'} className="h-full w-full object-cover" />
      ) : (
        <span className="text-sage-600 dark:text-sage-400 font-medium text-sm">
          {fallback || <User className={size === 'sm' ? 'h-4 w-4' : 'h-6 w-6'} />}
        </span>
      )}
    </div>
  );
};

export default Avatar;
