import React from 'react';
import { format } from 'date-fns';
import { makeStyles, Typography, Dialog, DialogContent, DialogActions, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

interface DatePopupPropTypes {
  date: Date | string;
  isOpen: boolean;
  onOk: () => void;
  onClose: () => void;
  onChange: (event: Date) => void;
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
const useStyles = makeStyles((theme) => ({
  expiryDateField: {
    minWidth: '100%',
  },
}));
const useDialogActionStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const DatePopup: React.FC<DatePopupPropTypes> = ({ isOpen, onOk, onClose, onChange, date }) => {
  const dialogContentClasses = useDialogContentStyles();
  const dialogActionClasses = useDialogActionStyles();
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Dialog
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') onOk();
        }}
        open={isOpen}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent classes={dialogContentClasses}>
          <Typography variant="h3">Expiry date</Typography>
          <KeyboardDatePicker
            className={classes.expiryDateField}
            disableToolbar
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-dialog"
            label="Enter the expiry date"
            value={date}
            onChange={onChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </DialogContent>
        <DialogActions classes={dialogActionClasses}>
          <Button color="secondary" variant="outlined" onClick={onClose}>
            CLOSE
          </Button>
          <Button variant="outlined" color="secondary" onClick={onOk}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
};

export { DatePopup };
