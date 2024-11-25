declare module 'lucide-react' {
    import { ComponentType } from 'react';
  
    interface IconProps {
      size?: number | string;
      color?: string;
      strokeWidth?: number | string;
      className?: string;
      style?: React.CSSProperties;
    }
  
    export const Github: ComponentType<IconProps>;
    export const Google: ComponentType<IconProps>;
    export const LogOut: ComponentType<IconProps>;
    // Añade aquí cualquier otro ícono que necesites usar
  }