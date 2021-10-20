import React from 'react';
import { makeStyles, Typography, Dialog, DialogContent, DialogActions, Button } from '@material-ui/core';

interface PopUpModalPropTypes {
  isOpen: boolean;
  onOkClick: () => void;
  headerText: string | React.ReactNode;
  bodyText: string | React.ReactNode;
  closeOrOkText: string;
  cancelText?: string;
  onCancelClick?: () => void;
  outlinedButton?: boolean;
}

const useDialogContentStyles = makeStyles((theme) => ({
  root: {
    color: '#171C1F',
    '&:first-child': {
      padding: theme.spacing(2, 3, 0),
    },
    '& > h3': {
      fontSize: '1.25rem',
      lineHeight: '2rem',
      fontWeight: 500,
      marginBottom: theme.spacing(2),
    },
  },
}));

const useDialogActionStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const PopUpModal: React.FC<PopUpModalPropTypes> = ({
  isOpen,
  onOkClick,
  headerText,
  bodyText,
  closeOrOkText,
  cancelText,
  onCancelClick,
  outlinedButton = false,
}) => {
  const dialogContentClasses = useDialogContentStyles();
  const dialogActionClasses = useDialogActionStyles();

  return (
    <Dialog
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') onOkClick();
      }}
      open={isOpen}
      fullWidth
      maxWidth="sm"
    >
      <DialogContent classes={dialogContentClasses}>
        {headerText && <Typography variant="h3">{headerText}</Typography>}
        {typeof bodyText === 'string' ? <Typography variant="body1">{bodyText}</Typography> : bodyText}
      </DialogContent>
      <DialogActions classes={dialogActionClasses}>
        {cancelText && (
          <Button color="secondary" {...(outlinedButton && { variant: 'outlined' })} onClick={onCancelClick}>
            {cancelText}
          </Button>
        )}
        <Button
          variant={outlinedButton && cancelText ? 'outlined' : cancelText ? 'contained' : 'outlined'}
          color="secondary"
          onClick={onOkClick}
        >
          {closeOrOkText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { PopUpModal };
