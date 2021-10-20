import { gql, useMutation } from '@apollo/client';
import { PrintDeliveryBagLabels } from '@rf2/picking/data/api-contracts';

export const PRINT_DELIVERY_LABELS = gql`
  mutation printDeliveryBagLabels($printDeliveryBagLabelsInput: PrintDeliveryBagLabelsInput) {
    printDeliveryBagLabels(printDeliveryBagLabelsInput: $printDeliveryBagLabelsInput) {
      labels {
        id
        orderNo
        position
        pickingZoneId
        pickingZoneName
        barcode
      }
    }
  }
`;

interface PrintDeliveryLabelsData {
  printDeliveryBagLabels: PrintDeliveryBagLabels;
}

export const usePrintDeliveryLabels = (onPrintDeliveryLabelsComplete) => {
  const [
    printDeliveryBagLabels,
    { data: printDeliveryLabelsData, error: printDeliveryLabelsError, loading: printDeliveryLabelsLoading },
  ] = useMutation<PrintDeliveryLabelsData>(PRINT_DELIVERY_LABELS, {
    onCompleted({ printDeliveryBagLabels }) {
      onPrintDeliveryLabelsComplete(printDeliveryBagLabels);
    },
  });

  return { printDeliveryBagLabels, printDeliveryLabelsData, printDeliveryLabelsError, printDeliveryLabelsLoading };
};
