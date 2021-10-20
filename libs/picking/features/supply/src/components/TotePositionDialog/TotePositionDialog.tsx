import { Button, Dialog, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMoveToteItem } from '@rf2/picking/data/api';
import { Order } from '@rf2/picking/data/api-contracts';
import { triggerBeebTone } from '@rf2/picking/features/supply';
import { ToteIcon } from '@rf2/shared/icons';
import { BagStatus, FadeTransition } from '@rf2/ui';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useBarcodeScanner } from '../../hooks';
import { ChangeTotePopup } from '../ChangeTotePopup';
import { IncorrectLabelScan } from '../IncorrectLabelScan';

interface TotePositionDialogPropTypes {
  userName: string;
  branchNo: string;
  isOpen: boolean;
  position: number;
  quantity?: number;
  isExpress?: boolean;
  toteBarcode: string;
  onSuccessfulScan: () => void;
  isSpecialItem?: boolean;
  canSkipToteBarcodeScan: boolean;
  order: Order;
  alternateToteBarcodes?: string[];
  toteItemId?: string;
  isKgOrWeightRange?: boolean;
}

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  totePosition: {
    fontSize: '1.5rem',
    fontWeight: 700,
    lineHeight: '2rem',
    margin: theme.spacing(0, 2, 0, 1),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 2, 2),
  },
  contentText: {
    fontSize: '1.25rem',
    lineHeight: '1.625rem',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: theme.spacing(2),
    background: theme.palette.grey[100],
    '& > div': {
      paddingLeft: theme.spacing(3),
      '&:first-child': {
        paddingLeft: 0,
      },
    },
  },
  footerLabel: {
    fontSize: '0.6875rem',
    fontWeight: 700,
    lineHeight: '0.8125rem',
    textTransform: 'uppercase',
    color: '#899195',
    letterSpacing: '1px',
    marginBottom: theme.spacing(0.5),
  },
  footerValue: {
    fontSize: '1.25rem',
    lineHeight: '1.5rem',
    color: '#171C1F',
  },
  skipActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 2, 2),
    background: theme.palette.grey[100],
  },
}));

const TotePositionDialog: React.FC<TotePositionDialogPropTypes> = ({
  userName,
  branchNo,
  isOpen,
  position,
  order,
  quantity,
  isExpress = false,
  toteBarcode,
  onSuccessfulScan,
  isSpecialItem = false,
  canSkipToteBarcodeScan = false,
  alternateToteBarcodes,
  toteItemId,
  isKgOrWeightRange = false,
}) => {
  const classes = useStyles();
  const [showIncorrectLabelScanPopUp, setShowIncorrectLabelScanPopUp] = useState(false);
  const [showTotePositionDialog, setShowTotePositionDialog] = useState(false);
  const [showChangeTotePopUp, setShowChangeTotePopUp] = useState(false);
  const [newToteBarcode, setNewToteBarcode] = useState(null);
  const { mutate: moveToteItem } = useMoveToteItem();

  useEffect(() => {
    setShowTotePositionDialog(isOpen);
  }, [isOpen]);

  useEffect(() => {
    ReactDOM.unstable_batchedUpdates(() => {
      setShowIncorrectLabelScanPopUp(showIncorrectLabelScanPopUp);
      setShowTotePositionDialog(showTotePositionDialog);
    });
  }, [showTotePositionDialog, showIncorrectLabelScanPopUp]);

  const validateToteBarcode = (scanType, scannedBarcode) => {
    if (showTotePositionDialog) {
      const validToteBarcode = scannedBarcode && scannedBarcode === toteBarcode;
      if (validToteBarcode) {
        onSuccessfulScan();
      } else {
        const isAlternateBarcode = !isSpecialItem && alternateToteBarcodes.findIndex((x) => x === scannedBarcode) >= 0;
        if (isAlternateBarcode) {
          ReactDOM.unstable_batchedUpdates(() => {
            setNewToteBarcode(scannedBarcode);
            setShowTotePositionDialog(false);
            setShowChangeTotePopUp(true);
          });
        } else {
          triggerBeebTone();
          ReactDOM.unstable_batchedUpdates(() => {
            setShowIncorrectLabelScanPopUp(true);
            setShowTotePositionDialog(false);
          });
        }
      }
    }
  };

  const onChangeTote = () => {
    const moveToteItemInput = {
      userName: userName,
      branchNo: branchNo,
      toteItemId: toteItemId,
      originalToteId: toteBarcode,
      newToteId: newToteBarcode,
    };
    moveToteItem({ variables: { moveToteItemInput } });
    onSuccessfulScan();
    setShowChangeTotePopUp(false);
  };

  const onPopUpClose = () => {
    ReactDOM.unstable_batchedUpdates(() => {
      setShowTotePositionDialog(true);
      setShowIncorrectLabelScanPopUp(false);
    });
  };

  const onSkipClick = () => {
    onSuccessfulScan();
  };

  useBarcodeScanner(validateToteBarcode);

  return (
    <>
      <ChangeTotePopup
        closeOrOkText="YES"
        cancelText="NO"
        onCloseClick={() => {
          setShowChangeTotePopUp(false);
          setShowTotePositionDialog(true);
        }}
        isOpen={showChangeTotePopUp}
        onConfirmClick={onChangeTote}
      />
      <IncorrectLabelScan isOpen={showIncorrectLabelScanPopUp} onClose={onPopUpClose} />
      <Dialog
        TransitionComponent={FadeTransition}
        open={showTotePositionDialog}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth
        maxWidth="sm"
      >
        <div className={classes.header}>
          <ToteIcon />
          <Typography className={classes.totePosition}>Tote {position}</Typography>
          <BagStatus bagType={order.packagingType} />
        </div>
        <div className={classes.content}>
          <Typography className={classes.contentText}>
            {isSpecialItem || isKgOrWeightRange ? (
              <>Place the item{quantity === 1 ? '' : 's'} into the tote</>
            ) : (
              <>
                Place{' '}
                <strong>
                  {quantity} item{quantity === 1 ? '' : 's'}
                </strong>{' '}
                into the tote
              </>
            )}
          </Typography>
          {!canSkipToteBarcodeScan && (
            <Typography className={classes.contentText}>Scan tote label to continue</Typography>
          )}
        </div>
        <div className={classes.footer}>
          <div>
            <Typography className={classes.footerLabel}>ORDER NUMBER</Typography>
            <Typography className={classes.footerValue}>{order.id}</Typography>
          </div>
          {order.locationCode && (
            <div>
              <Typography className={classes.footerLabel}>LOC</Typography>
              <Typography className={classes.footerValue}>#{order.locationCode}</Typography>
            </div>
          )}
        </div>
        {canSkipToteBarcodeScan && (
          <div className={classes.skipActions}>
            <Button variant="contained" color="secondary" onClick={onSkipClick}>
              OK
            </Button>
          </div>
        )}
      </Dialog>
    </>
  );
};

export { TotePositionDialog };
