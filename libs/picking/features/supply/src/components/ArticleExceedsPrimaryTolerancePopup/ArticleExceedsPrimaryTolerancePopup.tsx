import React from 'react';
import { Typography } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import { PopUpModal } from '@rf2/ui';

interface ArticleExceedsPrimaryTolerancePopupProps {
  quantityValue: number;
  onClose: () => void;
  onConfirm: (quantityValue: number) => void;
}

const useStyles = makeStyles((theme) => ({
  headerText: {
    fontWeight: 500,
    color: theme.palette.warning.main,
    display: 'flex',
    flexDirection: 'row',
    '& > svg': {
      marginRight: theme.spacing(1),
    },
  },
}));

const ArticleExceedsPrimaryTolerancePopup: React.FC<ArticleExceedsPrimaryTolerancePopupProps> = ({
  quantityValue,
  onClose,
  onConfirm,
}) => {
  const classes = useStyles();

  return (
    <PopUpModal
      isOpen={true}
      onOkClick={() => onConfirm(quantityValue)}
      onCancelClick={onClose}
      bodyText={`Confirm to keep ${quantityValue}g or cancel to select an alternative`}
      headerText={
        <Typography variant="body1" className={classes.headerText}>
          <WarningIcon />
          Previously supplied weight exceeds primary tolerance
        </Typography>
      }
      cancelText="CANCEL"
      closeOrOkText="CONFIRM"
    />
  );
};

export { ArticleExceedsPrimaryTolerancePopup };
