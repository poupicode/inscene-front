import { createContext, useContext, useState, ReactNode } from 'react';
import { Breakpoint } from '@mui/material';

type ContainerMaxWidth = Breakpoint | false;

interface LayoutContextType {
  containerMaxWidth: ContainerMaxWidth;
  setContainerMaxWidth: (width: ContainerMaxWidth) => void;
  disableGutters: boolean;
  setDisableGutters: (disable: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [containerMaxWidth, setContainerMaxWidth] = useState<ContainerMaxWidth>('lg'); // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false (full-width)
  const [disableGutters, setDisableGutters] = useState<boolean>(false);

  return (
    <LayoutContext.Provider
      value={{
        containerMaxWidth,
        setContainerMaxWidth,
        disableGutters,
        setDisableGutters,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within LayoutProvider');
  }
  return context;
};
