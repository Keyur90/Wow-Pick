import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { PrintCollectBagLabels } from '@rf2/picking/data/api-contracts';
import React from 'react';

interface PrintedCollectLabelConfirmationPopupPropTypes {
  labelDetails: PrintCollectBagLabels;
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

const PrintedCollectLabelConfirmationPopup: React.FC<PrintedCollectLabelConfirmationPopupPropTypes> = ({
  labelDetails,
  onClose,
}) => {
  const dialogContentClasses = useDialogContentStyles();
  const dialogActionClasses = useDialogActionStyles();
  const classes = useClasses();
  const { labels } = labelDetails;

  return (
    <Dialog open={true} fullWidth maxWidth="sm">
      <DialogContent classes={dialogContentClasses}>
        <Typography variant="h3">
          Printed {labels.length} label{labels.length !== 1 ? 's' : ''}
        </Typography>
        <List>
          {labels.map(({ orderNo }, index) => (
            <ListItem key={index} className={classes.listItem} disableGutters>
              <ListItemText>
                {orderNo} - Bag {index + 1}
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

export { PrintedCollectLabelConfirmationPopup };
