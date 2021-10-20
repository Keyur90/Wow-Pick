import { gql, useMutation } from '@apollo/client';
import { PrintToteLabels } from '@rf2/picking/data/api-contracts';

export const PRINT_TOTE_LABELS = gql`
  mutation printToteLabels($printToteLabelsInput: PrintToteLabelsInput) {
    printToteLabels(printToteLabelsInput: $printToteLabelsInput) {
      labels {
        id
        orderNo
        position
        pickingZoneId
        barcode
      }
      error
    }
  }
`;

interface PrintToteLabelsData {
  printToteLabels: PrintToteLabels;
}

export const usePrintToteLabels = (onPrintToteLabelsComplete, onPrintToteLabelsError) => {
  const [
    printToteLabels,
    { data: printToteLabelsData, error: printToteLabelsError, loading: printToteLabelsLoading },
  ] = useMutation<PrintToteLabelsData>(PRINT_TOTE_LABELS, {
    onCompleted({ printToteLabels }) {
      onPrintToteLabelsComplete(printToteLabels);
    },
    onError(error) {
      onPrintToteLabelsError(error);
    },
  });

  return { printToteLabels, printToteLabelsData, printToteLabelsError, printToteLabelsLoading };
};
