import React from 'react';
import {
  makeStyles,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Tote } from '@rf2/picking/data/api-contracts';

interface PrintedToteLabelConfirmationPopupPropTypes {
  extraLabels: Tote[];
  onClose: () => void;
}

const useDialogContentStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 2.5),
    '&:first-child': {
      paddingTop: theme.spacing(3.5),
    },
    '& > h3': {
      marginBottom: theme.spacing(1),
    },
  },
}));

const useClasses = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(0),
  },
}));

const useDialogActionStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2.5),
  },
}));

const PrintedToteLabelConfirmationPopup: React.FC<PrintedToteLabelConfirmationPopupPropTypes> = ({
  extraLabels,
  onClose,
}) => {
  const dialogContentClasses = useDialogContentStyles();
  const dialogActionClasses = useDialogActionStyles();
  const classes = useClasses();

  return (
    <Dialog open={true} fullWidth maxWidth="sm">
      <DialogContent classes={dialogContentClasses}>
        <Typography variant="h3">
          Printed {extraLabels.length} label{extraLabels.length !== 1 ? 's' : ''}
        </Typography>
        <List>
          {extraLabels.map(({ id, orderNo, position }) => (
            <ListItem key={id} className={classes.listItem} disableGutters>
              <ListItemText>
                {orderNo} - Tote {position}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions classes={dialogActionClasses}>
        <Button variant="outlined" color="secondary" onClick={() => null}>
          REPRINT
        </Button>
        <Button variant="contained" color="secondary" onClick={() => onClose()}>
          CONTINUE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { PrintedToteLabelConfirmationPopup };
