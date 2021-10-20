import { gql, useQuery } from '@apollo/client';
import { GetNextTrip } from '@rf2/picking/data/api-contracts';

export const GET_NEXT_TRIP = gql`
  query getNextTrip($userName: String!, $branchNo: String!, $trolleyType: String) {
    getNextTrip(userName: $userName, branchNo: $branchNo, trolleyType: $trolleyType) {
      id
      branchNo
      isNewTrolley
      pickingDone
      lastUpdatedUtcTimeTicks
      trolleyType
      isExpress
      trolleyStatus
      goalTime
      elapsedTime
      bonusTime
      isBulk
      totes {
        id
        orderNo
        position
        pickingZoneId
        pickingZoneName
        barcode
      }
      orders {
        id
        packagingType
        orderPrice
        deliveryMethod
        locationCode
        transitCode
        deliveryDate
        customerName
      }
      toteItems {
        id
        lastUpdatedUtcTimeTicks
        toteId
        itemIndex
        orderNo
        articleId
        secondaryArticleId
        aisle
        bay
        shelf
        orderedQuantity
        currentPage
        totalPages
        personalShopperNotes
        stockOnHand
        suppliedDetails {
          type
          articleId
          scanDetails {
            storePrice
            barcode
            suppliedPrice
            quantity
            weight
            batchNo
            expiryDate
            dataBar
          }
        }
        totalSuppliedQuantity @client
        isSubstituted @client
        silentSubbed @client
        article {
          description
          imageUrl
          unitPrice
          pricingUnit
          brand
          eachMultiplier
          genericName
          variety
          volumeSize
          preferredShelfLife
          minShelfLife
          isPerishable
          productRecall
          productWithdrawal
          wontScanKg
          wontScanEach
          wscanQuantityLimit
          weightPrimaryTolerance
          weightSecondaryTolerance
          weightOverride
          useWeightRange
          minWeight
          maxWeight
          barcodes {
            barcode
            barcodeType
            isPrimary
          }
        }
      }
      collectibles {
        id
        lastUpdatedUtcTimeTicks
        itemIndex
        orderNo
        articleId
        toteId
        orderedQuantity
        stockOnHand
        article {
          description
          imageUrl
          unitPrice
          pricingUnit
          brand
          genericName
          variety
          volumeSize
          preferredShelfLife
          minShelfLife
          isPerishable
        }
        suppliedQuantity
        totalSuppliedQuantity @client
      }
      freeSamples {
        id
        lastUpdatedUtcTimeTicks
        description
        suppliedQuantity
        toteId
        orderNo
      }
    }
  }
`;

interface GetNextTripData {
  getNextTrip: GetNextTrip;
}

export const useGetNextTrip = (userName: string, branchNo: string, trolleyType: string) => {
  const { loading, data, error } = useQuery<GetNextTripData>(GET_NEXT_TRIP, {
    variables: { userName, branchNo, trolleyType },
  });

  return {
    loading,
    data: data?.getNextTrip,
    error,
  };
};
