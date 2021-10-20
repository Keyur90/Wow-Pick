import React, { useState } from 'react';
import { makeStyles, Dialog, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';
import { QuantityField } from '@rf2/ui';
import { useInputDeliveryLabelQuantityValidation } from '@rf2/shared/utility';

interface AddBagLabelsDeliveryPopupPropTypes {
  labelCountDetails: Record<string, unknown>;
  onConfirm: (value: string) => void;
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

const AddBagLabelsDeliveryPopup: React.FC<AddBagLabelsDeliveryPopupPropTypes> = ({ labelCountDetails, onConfirm }) => {
  const dialogContentClasses = useDialogContentStyles();
  const dialogActionClasses = useDialogActionStyles();
  const [inputValue, setInputValue] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { inputError } = useInputDeliveryLabelQuantityValidation(inputValue);
  const { pickingZoneName } = labelCountDetails;

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
          How many <strong>{pickingZoneName}</strong> bag labels are required?
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
        <Button variant="contained" color="secondary" onClick={handleConfirm}>
          NEXT
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { AddBagLabelsDeliveryPopup };
