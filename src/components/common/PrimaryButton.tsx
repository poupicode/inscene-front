import { Button, ButtonProps } from '@mui/material';

interface PrimaryButtonProps extends Omit<ButtonProps, 'variant' | 'color'> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export default function PrimaryButton({ children, fullWidth = false, sx, ...props }: PrimaryButtonProps) {
  return (
    <Button
      variant="contained"
      {...props}
      sx={{
        py: '11px',
        px: '26px',
        fontSize: '17px',
        fontWeight: 600,
        color: '#ffffff',
        textTransform: 'none',
        borderRadius: '20px',
        width: fullWidth ? '100%' : 'max-content',
        ...sx
      }}
    >
      {children}
    </Button>
  );
}
