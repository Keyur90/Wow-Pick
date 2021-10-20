import { Button, Dialog, DialogActions, DialogContent, makeStyles, Typography } from '@material-ui/core';
import { Tote } from '@rf2/picking/data/api-contracts';
import { useInputLabelQuantityValidation } from '@rf2/shared/utility';
import { QuantityField } from '@rf2/ui';
import React, { useState } from 'react';

interface AddLabelToTotePopupPropTypes {
  tote: Tote;
  onConfirm: (value: string) => void;
  onClose: () => void;
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

const AddLabelToTotePopup: React.FC<AddLabelToTotePopupPropTypes> = ({ tote, onConfirm, onClose }) => {
  const dialogContentClasses = useDialogContentStyles();
  const dialogActionClasses = useDialogActionStyles();
  const [inputValue, setInputValue] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { inputError } = useInputLabelQuantityValidation(inputValue);
  const { position, pickingZoneName } = tote;

  const handleInputFocus = () => {
    setHasSubmitted(false);
  };

  const handleInputBlur = (evt) => {
    setInputValue(evt?.target?.value);
  };

  const handleConfirm = () => {
    setHasSubmitted(true);
    if (!inputError) {
      onConfirm(inputValue);
    }
  };

  return (
    <Dialog open={true} fullWidth maxWidth="sm">
      <DialogContent classes={dialogContentClasses}>
        <Typography variant="h3">
          Add labels for tote {position}: <strong>{pickingZoneName}</strong>
        </Typography>
        <QuantityField
          name="labelQuantity"
          label={'Enter the label quantity'}
          defaultValue={1}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          error={hasSubmitted && !!inputError}
          errorText={inputError}
        />
      </DialogContent>
      <DialogActions classes={dialogActionClasses}>
        <Button color="secondary" onClick={onClose}>
          CANCEL
        </Button>
        <Button variant="contained" color="secondary" onClick={handleConfirm}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { AddLabelToTotePopup };
