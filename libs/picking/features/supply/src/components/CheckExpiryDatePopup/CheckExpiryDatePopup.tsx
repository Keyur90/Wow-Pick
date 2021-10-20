import React from 'react';
import { makeStyles, Typography, Dialog, DialogContent, DialogActions, Button } from '@material-ui/core';

interface CheckExpiryDatePopupPropTypes {
  isOpen: boolean;
  preferredExpiryDate?: string;
  minExpiryDate?: string;
  onPickAnotherArticle: () => void;
  onProceedWithCurrentArticle?: () => void;
}

const useDialogContentStyles = makeStyles((theme) => ({
  root: {
    color: '#171C1F',
    minHeight: '100px',
    padding: theme.spacing(3),
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
    justifyContent: 'center',
  },
}));

const useStyles = makeStyles((theme) => ({
  body: {
    '& > span': {
      fontSize: '1.25rem',
      lineHeight: '2rem',
      fontWeight: 500,
      color: 'green',
    },
  },
  button: {
    minWidth: '95%',
  },
}));

const CheckExpiryDatePopup: React.FC<CheckExpiryDatePopupPropTypes> = ({
  isOpen,
  preferredExpiryDate,
  minExpiryDate,
  onPickAnotherArticle,
  onProceedWithCurrentArticle,
}) => {
  const dialogContentClasses = useDialogContentStyles();
  const dialogActionClasses = useDialogActionStyles();
  const classes = useStyles();

  return (
    <Dialog disableBackdropClick={true} open={isOpen} fullWidth maxWidth="sm">
      <DialogContent classes={dialogContentClasses}>
        <Typography variant="h3">Check Expiry Date</Typography>
        <Typography variant="body1" className={classes.body}>
          {preferredExpiryDate ? (
            <>
              Expiring <span>{preferredExpiryDate}</span> or later (Min. Expiry {minExpiryDate})
            </>
          ) : (
            <>
              Min. Expiry <span>{minExpiryDate}</span> or later
            </>
          )}
        </Typography>
      </DialogContent>
      <DialogActions disableSpacing={true} classes={dialogActionClasses}>
        <Button color="secondary" variant="outlined" onClick={onPickAnotherArticle} className={classes.button}>
          Pick another article
        </Button>
      </DialogActions>
      {onProceedWithCurrentArticle && (
        <DialogActions classes={dialogActionClasses}>
          <Button variant="outlined" color="secondary" onClick={onProceedWithCurrentArticle} className={classes.button}>
            Proceed with this article
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export { CheckExpiryDatePopup };
