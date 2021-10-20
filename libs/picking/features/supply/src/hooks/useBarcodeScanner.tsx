import { useEffect } from 'react';
import PubSub from 'pubsub-js';
import { BarcodeScanEvents } from '@rf2/shared/utility';

export const useBarcodeScanner = (scannedBarcodeHandler) => {
  useEffect(() => {
    const scannerDataSubscription = PubSub.subscribe(BarcodeScanEvents.BARCODE_SCAN, (topic, data) =>
      scannedBarcodeHandler(topic, data)
    );
    return () => {
      PubSub.unsubscribe(scannerDataSubscription);
    };
  }, [scannedBarcodeHandler]);
};
