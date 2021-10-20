import React, { ReactNode } from 'react';
import { Button as MuiButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface ButtonPropTypes {
  children: NonNullable<ReactNode>;
  onClick: () => void;
  variant?: ButtonVariantType;
  fullWidth?: boolean;
  disabled?: boolean;
}

type ButtonVariantType = 'contained' | 'outlined';

const useStyles = makeStyles((theme) => ({
  outlinedPrimary: {
    background: theme.palette.common.white,
  },
}));

const Button: React.FC<ButtonPropTypes> = ({
  children,
  onClick,
  variant = 'contained',
  fullWidth = true,
  disabled = false,
}) => {
  const classes = useStyles();

  return (
    <MuiButton
      classes={classes}
      color="primary"
      fullWidth={fullWidth}
      variant={variant}
      size={'large'}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </MuiButton>
  );
};

export { Button };
