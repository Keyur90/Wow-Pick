import React from 'react';
import { makeStyles, Dialog, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';

interface AddBagLabelsNotRequiredPropTypes {
  labelDetails: Record<string, unknown>;
  onConfirm: () => void;
}

const useDialogContentStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 2.5),
    '&:first-child': {
      paddingTop: theme.spacing(3.5),
    },
    '& > h3': {
      marginBottom: theme.spacing(3),
    },
  },
}));

const useDialogActionStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2.5),
  },
}));

const AddBagLabelsNotRequired: React.FC<AddBagLabelsNotRequiredPropTypes> = ({ labelDetails, onConfirm }) => {
  const dialogContentClasses = useDialogContentStyles();
  const dialogActionClasses = useDialogActionStyles();
  const { position } = labelDetails;

  return (
    <Dialog open={true} fullWidth maxWidth="sm">
      <DialogContent classes={dialogContentClasses}>
        <Typography variant="h3">Tote {position} does not require bag labels</Typography>
      </DialogContent>
      <DialogActions classes={dialogActionClasses}>
        <Button variant="contained" color="secondary" onClick={onConfirm}>
          NEXT
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { AddBagLabelsNotRequired };
