const DEVICE_SCANNED_EVENT = 'DEVICE:ScannedData';

export const scanBarcode = (barcode: string): void => {
  cy.window().then((win) => {
    win.PubSub.publishSync(DEVICE_SCANNED_EVENT, barcode);
  });
};
