import React, { useState } from 'react';
import { makeStyles, Dialog, DialogContent, DialogActions, Button, Typography } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { useSecondaryToleranceValidation } from '@rf2/shared/utility';
import { QuantityField } from '@rf2/ui';

interface ArticleExceedsSecondaryTolerancePopupPropTypes {
  quantityValue: number;
  onConfirm: (quantityValue: number, inputError: string | null) => void;
  onClose: () => void;
}

const useDialogContentStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 2.5),
    '&:first-child': {
      paddingTop: theme.spacing(3.5),
    },
    '& > p': {
      color: theme.palette.error.main,
      fontWeight: 500,
      marginBottom: theme.spacing(3),
      display: 'flex',
      flexDirection: 'row',
      '& > svg': {
        marginRight: theme.spacing(1),
      },
    },
  },
}));

const useDialogActionStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2.5),
  },
}));

const ArticleExceedsSecondaryTolerancePopup: React.FC<ArticleExceedsSecondaryTolerancePopupPropTypes> = ({
  quantityValue,
  onConfirm,
  onClose,
}) => {
  const dialogContentClasses = useDialogContentStyles();
  const dialogActionClasses = useDialogActionStyles();
  const [inputValue, setInputValue] = useState(0);
  const { inputError } = useSecondaryToleranceValidation(inputValue, quantityValue);

  const handleInputBlur = (evt) => {
    setInputValue(evt?.target?.value);
  };

  const handleConfirm = () => {
    onConfirm(quantityValue, inputError);
  };

  return (
    <Dialog open={true} fullWidth maxWidth="sm">
      <DialogContent classes={dialogContentClasses}>
        <Typography variant="body1">
          <WarningIcon />
          Previously supplied weight ({quantityValue}g) exceeds secondary tolerance
        </Typography>
        <QuantityField
          name="suppliedQuantityVerify"
          label={'Enter the weight again to confirm'}
          defaultValue={null}
          onBlur={handleInputBlur}
          error={false}
          startAdornment={'g'}
        />
      </DialogContent>
      <DialogActions classes={dialogActionClasses}>
        <Button color="secondary" onClick={onClose}>
          CANCEL
        </Button>
        <Button variant="contained" color="secondary" onClick={handleConfirm}>
          CONFIRM
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ArticleExceedsSecondaryTolerancePopup };
