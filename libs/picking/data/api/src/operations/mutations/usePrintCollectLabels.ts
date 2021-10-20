import { gql, useMutation } from '@apollo/client';
import { PrintCollectBagLabels } from '@rf2/picking/data/api-contracts';

export const PRINT_COLLECT_LABELS = gql`
  mutation printCollectBagLabels($printCollectBagLabelsInput: PrintCollectBagLabelsInput) {
    printCollectBagLabels(printCollectBagLabelsInput: $printCollectBagLabelsInput) {
      labels {
        id
        orderNo
        position
        pickingZoneId
        barcode
      }
    }
  }
`;

interface PrintCollectLabelsData {
  printCollectBagLabels: PrintCollectBagLabels;
}

export const usePrintCollectLabels = (onPrintCollectLabelsComplete) => {
  const [
    printCollectBagLabels,
    { data: printCollectLabelsData, error: printCollectLabelsError, loading: printCollectLabelsLoading },
  ] = useMutation<PrintCollectLabelsData>(PRINT_COLLECT_LABELS, {
    onCompleted({ printCollectBagLabels }) {
      onPrintCollectLabelsComplete(printCollectBagLabels);
    },
  });

  return { printCollectBagLabels, printCollectLabelsData, printCollectLabelsError, printCollectLabelsLoading };
};
