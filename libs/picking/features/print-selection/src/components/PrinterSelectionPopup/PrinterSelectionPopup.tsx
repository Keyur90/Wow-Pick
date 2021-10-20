import { Dialog, DialogContent, makeStyles } from '@material-ui/core';
import { PrintersPoolList } from '@rf2/picking/data/api-contracts';
import { useBarcodeScanner } from '@rf2/picking/features/supply';
import React, { useState } from 'react';
import { IncorrectLabelScanPopup } from '..';
import { Content } from '../Content';

interface PrinterSelectionPopupPropTypes {
  printersPoolList: PrintersPoolList;
  onPoolSelection: (printerPool: string) => void;
}

const useDialogContentStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3.5, 2.5),
  },
}));

const PrinterSelectionPopup: React.FC<PrinterSelectionPopupPropTypes> = ({ printersPoolList, onPoolSelection }) => {
  const dialogContentClasses = useDialogContentStyles();
  const [showPrinterSelection, setShowPrinterSelection] = useState(true);
  const [showScanError, setShowScanError] = useState(false);

  const handleBarcodeScan = (_scanType, scannedBarcode) => {
    const printerPool = printersPoolList.printerPools.find(({ id }) => scannedBarcode === id);

    if (printerPool) {
      onPoolSelection(printerPool.id);
    } else {
      setShowPrinterSelection(false);
      setShowScanError(true);
    }
  };

  const handleScanErrorClose = () => {
    setShowScanError(false);
    setShowPrinterSelection(true);
  };

  const handlePoolSelection = (event: React.ChangeEvent<{ value: unknown }>) => {
    onPoolSelection(event.target.value as string);
  };

  useBarcodeScanner(handleBarcodeScan);

  return (
    <>
      {showScanError && <IncorrectLabelScanPopup onClose={handleScanErrorClose} />}
      {showPrinterSelection && (
        <Dialog open={true} fullWidth maxWidth="sm">
          <DialogContent classes={dialogContentClasses}>
            <Content printersPoolList={printersPoolList} onPoolSelection={handlePoolSelection} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export { PrinterSelectionPopup };
