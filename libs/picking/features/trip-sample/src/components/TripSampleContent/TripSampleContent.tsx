import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSetFreeSampleSupplied, useUpdateFreeSampleSupplied } from '@rf2/picking/data/api';
import { FreeSample, Order, SuppliedFreeSampleInput, Tote } from '@rf2/picking/data/api-contracts';
import { TotePositionDialog } from '@rf2/picking/features/supply';
import { GlobalState } from '@rf2/shared/global-state';
import React, { useState } from 'react';
import { FreeSampleDetails } from '../FreeSampleDetails';

interface TripSampleContentPropTypes {
  trolleyId: string;
  freeSample: FreeSample;
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
    padding: theme.spacing(2),
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

const TripSampleContent: React.FC<TripSampleContentPropTypes> = ({
  globalState,
  freeSample,
  tote,
  order,
  onComplete,
  isExpress,
  trolleyId,
}) => {
  const classes = useStyles();
  const {
    userContext: { userName, branchNo },
    featureFlags: { canSkipToteBarcodeScan, showToteDialogForExpress },
  } = globalState;

  const { setFreeSampleSupplied } = useSetFreeSampleSupplied();
  const { mutate: updateFreeSampleSupplied } = useUpdateFreeSampleSupplied();
  const [showToteDialog, setShowToteDialog] = useState(false);

  const onClick = () => {
    if (isExpress && !showToteDialogForExpress) {
      onCloseMoveToNext();
      return;
    }
    setShowToteDialog(true);
  };

  const onCloseMoveToNext = () => {
    setFreeSampleSupplied(freeSample);
    const suppliedFreeSampleInput: SuppliedFreeSampleInput[] = [
      {
        userName: userName,
        branchNo: branchNo,
        trolleyId: trolleyId,
        id: freeSample.id,
        isSupplied: true,
      },
    ];

    updateFreeSampleSupplied({ variables: { suppliedFreeSampleInput } });
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
        isSpecialItem={true}
        toteBarcode={tote.barcode}
        onSuccessfulScan={onCloseMoveToNext}
        canSkipToteBarcodeScan={canSkipToteBarcodeScan}
      />
      <div className={classes.content}>
        <FreeSampleDetails freeSample={freeSample} tote={tote} order={order} />
      </div>
      <div className={classes.actions}>
        <Button color="secondary" size={'large'} onClick={onComplete}>
          NO
        </Button>
        <Button variant="contained" color="secondary" size={'large'} onClick={onClick}>
          YES
        </Button>
      </div>
    </div>
  );
};

export { TripSampleContent };
