import React, { useState } from 'react';
import { makeStyles, Dialog, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';
import { QuantityField } from '@rf2/ui';
import { useInputBarcodeValidation } from '@rf2/shared/utility';
import { Tote } from '@rf2/picking/data/api-contracts';

interface IdentifierLabelPopupPropTypes {
  totes: Tote[];
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

const IdentifierLabelPopup: React.FC<IdentifierLabelPopupPropTypes> = ({ totes, onConfirm, onClose }) => {
  const dialogContentClasses = useDialogContentStyles();
  const dialogActionClasses = useDialogActionStyles();
  const [inputValue, setInputValue] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { inputError } = useInputBarcodeValidation(inputValue, totes);

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
        <Typography variant="h3">Won't Scan</Typography>
        <QuantityField
          name="identifierLabel"
          label={'Enter the identifier of the label'}
          defaultValue={inputValue}
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

export { IdentifierLabelPopup };
