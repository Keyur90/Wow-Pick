import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@material-ui/core';

interface ImageDialogPropTypes {
  isOpen: boolean;
  onToggle: (force?: boolean) => void;
  imageUrl: string;
  errorText?: string;
}

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    width: 250,
    height: 250,
    '& img': {
      width: '100%',
      maxWidth: 250,
      height: 'auto',
    },
  },
  bodyText: {
    color: theme.palette.common.black,
  },
}));

const useDialogContentStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 3),
  },
}));

const useDialogActionStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const ImageDialog: React.FC<ImageDialogPropTypes> = ({ isOpen, onToggle, imageUrl, errorText }) => {
  const classes = useStyles();
  const dialogContentClasses = useDialogContentStyles();
  const dialogActionClasses = useDialogActionStyles();
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (errorText) {
      setHasError(true);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setHasError(false);
    }
  }, [isOpen]);

  return (
    <Dialog onClose={() => onToggle(false)} open={isOpen}>
      {hasError && <DialogTitle>Image not available</DialogTitle>}
      <DialogContent classes={dialogContentClasses}>
        {!hasError ? (
          <div className={classes.imageContainer}>
            <img src={imageUrl} alt="" onError={handleError} />
          </div>
        ) : (
          <Typography variant="body1" className={classes.bodyText}>
            {errorText}
          </Typography>
        )}
      </DialogContent>
      <DialogActions classes={dialogActionClasses}>
        <Button color="secondary" variant="outlined" onClick={() => onToggle(false)} size={'large'}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ImageDialog };
