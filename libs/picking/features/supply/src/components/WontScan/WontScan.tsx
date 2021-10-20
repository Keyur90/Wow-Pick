import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core';
import { ToteItem } from '@rf2/picking/data/api-contracts';
import { convertKgToGrams, isWeightedQuantityArticle, useInputQuantityValidation } from '@rf2/shared/utility';
import { QuantityField } from '@rf2/ui';
import Big from 'big.js';
import React, { useEffect, useState } from 'react';

interface WontScanPropTypes {
  onConfirm: (quantityValue: number, isSubbed: boolean) => void;
  onClose: () => void;
  toteItem: ToteItem;
  qtyFromBarcodeScan: number;
  isPrimary?: boolean;
}

const useDialogContentStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 2.5),
    '&:first-child': {
      paddingTop: theme.spacing(3.5),
    },
  },
}));

const useDialogActionStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2.5),
  },
}));

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
}));

const WontScan: React.FC<WontScanPropTypes> = ({
  onConfirm,
  onClose,
  toteItem,
  qtyFromBarcodeScan,
  isPrimary = true,
}) => {
  const dialogContentClasses = useDialogContentStyles();
  const dialogActionClasses = useDialogActionStyles();
  const classes = useStyles();
  const { orderedQuantity, totalSuppliedQuantity } = toteItem;
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const isWeighted = isWeightedQuantityArticle(toteItem);
  const tmpOrderedQuantity = new Big(orderedQuantity);
  let defaultValue = qtyFromBarcodeScan;
  if (defaultValue == null) {
    defaultValue = tmpOrderedQuantity.minus(totalSuppliedQuantity).gt(0)
      ? tmpOrderedQuantity.minus(totalSuppliedQuantity).toNumber()
      : 0;
  }
  const [inputValue, setInputValue] = useState(isWeighted ? convertKgToGrams(defaultValue) : defaultValue);
  const { inputError } = useInputQuantityValidation(inputValue, toteItem);

  const [selectedArticleId, setSelectedArticleId] = useState(
    isPrimary ? toteItem.articleId : toteItem.secondaryArticleId
  );
  const [isSubbed, setIsSubbed] = useState(false);

  useEffect(() => {
    if (selectedArticleId === toteItem.articleId) {
      setIsSubbed(false);
    } else {
      setIsSubbed(true);
    }
  }, [selectedArticleId]);

  const handleInputFocus = () => {
    setHasSubmitted(false);
  };

  const handleInputBlur = (evt) => {
    setInputValue(evt?.target?.value);
  };

  const handleConfirm = () => {
    setHasSubmitted(true);
    if (!inputError) {
      onConfirm(inputValue, isSubbed);
    }
  };

  const articleList = [
    { id: toteItem.articleId, type: 'primary', display: `${toteItem.articleId} (Ordered item)` },
    { id: toteItem.secondaryArticleId, type: 'silent', display: `${toteItem.secondaryArticleId} (Equivalent item)` },
  ];

  const onArticleSelected = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedArticleId(articleList.find(({ id }) => event.target.value === id)?.id);
  };

  return (
    <Dialog open={true} fullWidth maxWidth="sm">
      <DialogContent classes={dialogContentClasses}>
        <QuantityField
          name="suppliedQuantity"
          label={isWeighted ? 'Enter the weight in grams' : 'Enter the supplied quantity'}
          defaultValue={!isWeighted ? inputValue : ''}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          error={hasSubmitted && !!inputError}
          errorText={inputError}
          startAdornment={isWeighted ? 'g' : null}
        />
        {toteItem.secondaryArticleId ? (
          <FormControl className={classes.formControl}>
            <Select value={selectedArticleId} onChange={onArticleSelected} defaultChecked={true}>
              {articleList.map(({ id, display }) => (
                <MenuItem key={id} value={id}>
                  {display}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : null}
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

export { WontScan };
