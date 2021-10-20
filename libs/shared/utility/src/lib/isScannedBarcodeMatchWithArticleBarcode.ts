import { Article } from '@rf2/picking/data/api-contracts';

export const isScannedBarcodeMatchWithArticleBarcode = (
  scannedBarcode: string,
  article: Article
): { matchFound: boolean; isPrimary: boolean } => {
  const matchedBarcode = article.barcodes.find((x) => parseInt(x.barcode) === parseInt(scannedBarcode));

  if (matchedBarcode) {
    return { matchFound: true, isPrimary: matchedBarcode.isPrimary };
  }

  return { matchFound: false, isPrimary: false };
};
