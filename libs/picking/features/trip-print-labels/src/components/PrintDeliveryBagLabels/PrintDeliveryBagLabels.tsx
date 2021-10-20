import { useReactiveVar } from '@apollo/client';
import Typography from '@material-ui/core/Typography';
import { printerPoolVar, useGetNextTrip, usePrintCollectLabels } from '@rf2/picking/data/api';
import { GlobalState } from '@rf2/shared/global-state';
import { canDispatchOrder, PackagingTypes } from '@rf2/shared/utility';
import { Header, Loader } from '@rf2/ui';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AddBagLabelsDeliveryPopup } from './components/AddBagLabelsDeliveryPopup';
import { AddBagLabelsNotRequired } from './components/AddBagLabelsNotRequired';

interface PrintDeliveryBagLabelsPropTypes {
  globalState: GlobalState;
}

const PrintDeliveryBagLabels: React.FC<PrintDeliveryBagLabelsPropTypes> = ({ globalState }) => {
  const {
    userContext: { userName, branchNo },
    featureFlags: { isSingleOrderDispatchEnabled },
    trolleyType,
  } = globalState;
  const { data, loading } = useGetNextTrip(userName, branchNo, trolleyType);
  const [labelIndex, setLabelIndex] = useState(null);
  const [labelQuantities, setLabelQuantities] = useState(null);
  const history = useHistory();
  const currentPrintPoolVar = useReactiveVar(printerPoolVar);

  const onComplete = useCallback(() => {
    setLabelIndex(null);
    if (canDispatchOrder(data, isSingleOrderDispatchEnabled)) {
      history.push('/dispatch-order');
    } else {
      history.push('/');
    }
  }, [history]);

  useEffect(() => {
    if (data) {
      setLabelQuantities(
        data.totes.map((tote) => {
          const order = data.orders.find((order) => order.id === tote.orderNo);

          return {
            orderNo: tote.orderNo,
            position: tote.position,
            barcode: tote.barcode,
            labelCount: null,
            isBagLabelsRequired: order.packagingType !== PackagingTypes.NO_BAGS,
          };
        })
      );
      // start flow
      setLabelIndex(0);
    }
  }, [data]);

  const onPrintCollectLabelsComplete = ({ labels }) => {
    const tmpLabelQuantities = [...labelQuantities];
    tmpLabelQuantities[labelIndex].labelCount = labels.length;
    setLabelQuantities(tmpLabelQuantities);
    handlePrintConfirm();
  };

  const { printCollectBagLabels, printCollectLabelsLoading } = usePrintCollectLabels(onPrintCollectLabelsComplete);

  const handleQuantityConfirm = (quantity) => {
    const labelDetails = labelQuantities[labelIndex];
    const quantityNumber = parseInt(quantity);

    if (quantityNumber > 0) {
      printCollectBagLabels({
        variables: {
          printCollectBagLabelsInput: {
            userName: userName,
            branchNo: branchNo,
            printerId: currentPrintPoolVar.id,
            labelCount: quantityNumber,
            orderNo: labelDetails.orderNo,
            position: labelDetails.position,
            barcode: labelDetails.barcode,
          },
        },
      });
    } else {
      handlePrintConfirm();
    }
  };

  const handlePrintConfirm = () => {
    if (labelIndex < labelQuantities.length - 1) {
      setLabelIndex(labelIndex + 1);
    } else {
      onComplete();
    }
  };

  const showAddBagLabelsInput =
    labelIndex !== null &&
    labelQuantities[labelIndex].labelCount === null &&
    labelQuantities[labelIndex].isBagLabelsRequired &&
    !printCollectLabelsLoading;
  const showAddBagLabelsNotRequired =
    labelIndex !== null &&
    labelQuantities[labelIndex].labelCount === null &&
    !labelQuantities[labelIndex].isBagLabelsRequired &&
    !printCollectLabelsLoading;

  return (
    <>
      <Header>
        <Typography variant="h1" component="h1">
          Print Extra Labels
        </Typography>
      </Header>
      <Loader isLoading={loading || printCollectLabelsLoading} />
      {showAddBagLabelsInput && (
        <AddBagLabelsDeliveryPopup labelCountDetails={labelQuantities[labelIndex]} onConfirm={handleQuantityConfirm} />
      )}
      {showAddBagLabelsNotRequired && (
        <AddBagLabelsNotRequired labelDetails={labelQuantities[labelIndex]} onConfirm={handlePrintConfirm} />
      )}
    </>
  );
};

export { PrintDeliveryBagLabels };
