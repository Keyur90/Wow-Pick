import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useSetCollectibleSuppliedQuantity, useUpdateCollectibleQuantity } from '@rf2/picking/data/api';
import { Collectible, Order, SuppliedCollectibleInput, Tote } from '@rf2/picking/data/api-contracts';
import { TotePositionDialog } from '@rf2/picking/features/supply';
import { GlobalState } from '@rf2/shared/global-state';
import { useInputQuantityValidation } from '@rf2/shared/utility';
import { ArticleDetails, ItemQuantities, QuantityField } from '@rf2/ui';
import React, { useEffect, useState } from 'react';

interface TripCollectibleContentPropTypes {
  trolleyId: string;
  collectible: Collectible;
  tote: Tote;
  order: Order;
  onComplete: () => void;
  globalState: GlobalState;
  isExpress: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  content: {
    padding: theme.spacing(0),
    background: theme.palette.background.default,
  },
  actions: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: theme.palette.common.white,
    boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    padding: theme.spacing(3, 2, 2),
  },
  buttons: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    '& > button': {
      display: 'flex',
      justifyContent: 'center',
      '&:last-child': {
        marginLeft: theme.spacing(2),
      },
    },
  },
}));

const TripCollectibleContent: React.FC<TripCollectibleContentPropTypes> = ({
  globalState,
  collectible,
  tote,
  order,
  onComplete,
  isExpress,
  trolleyId,
}) => {
  const {
    userContext: { userName, branchNo },
    featureFlags: { canSkipToteBarcodeScan, showToteDialogForExpress },
  } = globalState;
  const { orderedQuantity, totalSuppliedQuantity } = collectible;
  const [inputValue, setInputValue] = useState(orderedQuantity - totalSuppliedQuantity);

  useEffect(() => {
    setInputValue(orderedQuantity - totalSuppliedQuantity);
  }, [orderedQuantity, totalSuppliedQuantity]);

  const [showToteDialog, setShowToteDialog] = useState(false);
  const { inputError } = useInputQuantityValidation(inputValue, collectible);
  const classes = useStyles();
  const { setCollectibleSuppliedQuantity } = useSetCollectibleSuppliedQuantity();

  const { mutate: updateSuppliedQuantity, data, error } = useUpdateCollectibleQuantity();

  const updateCollectibleSuppliedQuantity = () => {
    const suppliedCollectibleInput: SuppliedCollectibleInput[] = [
      {
        userName: globalState.userContext.userName,
        branchNo: globalState.userContext.branchNo,
        trolleyId: trolleyId,
        id: collectible.id,
        suppliedQuantity: parseInt(inputValue.toString()),
      },
    ];
    updateSuppliedQuantity({ variables: { suppliedCollectibleInput } });
  };

  const handleInputBlur = (evt) => {
    setInputValue(evt?.target?.value);
  };

  const onClick = () => {
    if (!inputError) {
      if (isExpress && !showToteDialogForExpress) {
        onCloseMoveToNext();
        return;
      }
      setShowToteDialog(true);
    }
  };

  const onCloseMoveToNext = () => {
    setCollectibleSuppliedQuantity(collectible, parseInt(inputValue.toString()));
    updateCollectibleSuppliedQuantity();
    setShowToteDialog(false);
    onComplete();
  };

  return (
    <div className={classes.root}>
      <TotePositionDialog
        userName={userName}
        branchNo={branchNo}
        isOpen={showToteDialog}
        position={tote.position}
        order={order}
        quantity={inputValue}
        isSpecialItem={true}
        toteBarcode={tote.barcode}
        onSuccessfulScan={onCloseMoveToNext}
        canSkipToteBarcodeScan={canSkipToteBarcodeScan}
        isExpress={isExpress}
      />
      <div className={classes.content}>
        <ArticleDetails toteItem={collectible} />
        <ItemQuantities order={order} toteItem={collectible} tote={tote} />
      </div>
      <div className={classes.actions}>
        <QuantityField
          name={`${collectible.id}-suppliedQuantity`}
          label={'Enter the supplied quantity'}
          defaultValue={orderedQuantity - totalSuppliedQuantity}
          onBlur={handleInputBlur}
          error={!!inputError}
          errorText={inputError}
        />
        <div className={classes.buttons}>
          <Button color="secondary" size={'large'} onClick={onComplete}>
            Close
          </Button>
          <Button variant="contained" color="secondary" size={'large'} onClick={onClick}>
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};

export { TripCollectibleContent };
