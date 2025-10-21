import React from 'react';
import { Button, ButtonProps, useTheme } from '@mui/material';

interface StyledButtonProps extends ButtonProps {
  compact?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({ 
  children, 
  compact = false,
  size = 'small',
  ...props 
}) => {
  const theme = useTheme();

  return (
    <Button
      size={size}
      {...props}
      sx={{
        minWidth: compact ? 'auto' : '120px',
        height: 32,
        px: compact ? 1 : 2,
        borderRadius: 1.5,
        backgroundColor: props.color === 'error' 
          ? theme.palette.error.main 
          : props.color === 'success'
          ? theme.palette.success.main
          : theme.palette.primary.main,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        fontSize: '0.75rem',
        fontWeight: 500,
        textTransform: 'none',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: props.color === 'error'
            ? theme.palette.error.dark
            : props.color === 'success'
            ? theme.palette.success.dark
            : theme.palette.primary.dark,
          boxShadow: 'none',
        },
        '&.Mui-disabled': {
          backgroundColor: theme.palette.action.disabledBackground,
          color: theme.palette.action.disabled,
        },
        ...(props.sx || {}),
      }}
    >
      {children}
    </Button>
  );
};

export default StyledButton;