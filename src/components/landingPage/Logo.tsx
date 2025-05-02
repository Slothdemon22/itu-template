import React from 'react';
import { Layers } from 'lucide-react';

interface LogoProps {
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ color = 'text-white' }) => {
  return (
    <div className={`flex items-center ${color}`}>
      <Layers className="h-8 w-8 mr-2" />
      <span className="font-bold text-xl tracking-tight">Elevate</span>
    </div>
  );
};

export default Logo;