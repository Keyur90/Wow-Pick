import React from 'react';
import { makeStyles, Typography, Dialog } from '@material-ui/core';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import { Button } from '@rf2/ui';

interface PersonalShopperNotesDialogPropTypes {
  isOpen: boolean;
  onToggle: (force?: boolean) => void;
  message: string;
}

const useStyles = makeStyles((theme) => ({
  dialogHeader: {
    padding: theme.spacing(1.5, 2),
    display: 'flex',
    alignItems: 'center',
    '& > svg': {
      color: theme.palette.primary.main,
      marginRight: theme.spacing(2),
    },
  },
  dialogContent: {
    padding: theme.spacing(0, 2),
  },
  dialogHeaderText: {
    color: '#171C1F',
    fontSize: '1.25rem',
    lineHeight: '2rem',
    fontWeight: 500,
  },
  dialogContentText: {
    color: '#171C1F',
  },
  dialogFooter: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const PersonalShopperNotesDialog: React.FC<PersonalShopperNotesDialogPropTypes> = ({ isOpen, onToggle, message }) => {
  const classes = useStyles();

  return (
    <Dialog onClose={() => onToggle(false)} open={isOpen}>
      <div className={classes.dialogHeader}>
        <SpeakerNotesIcon />
        <Typography variant="h3" className={classes.dialogHeaderText}>
          Customer Note
        </Typography>
      </div>
      <div className={classes.dialogContent}>
        <Typography variant="body1" className={classes.dialogContentText}>
          {message}
        </Typography>
      </div>
      <div className={classes.dialogFooter}>
        <Button variant={'outlined'} fullWidth={false} onClick={() => onToggle(false)}>
          Close
        </Button>
      </div>
    </Dialog>
  );
};

export { PersonalShopperNotesDialog };
