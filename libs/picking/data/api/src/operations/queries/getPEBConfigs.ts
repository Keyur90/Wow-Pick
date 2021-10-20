import { useQuery, gql } from '@apollo/client';
import { PEBConfig } from '@rf2/picking/data/api-contracts';

export const GET_PEG_CONFIGS = gql`
  query getPEBConfigs($allConfigs: String!) {
    getPEBConfigs(allConfigs: $allConfigs) {
      id
      description
      prefixStart
      prefixEnd
      barcodeLength
      priceOffset
      priceLength
      priceDecimals
      qtyOffset
      qtyLength
      qtyDecimals
      itemLength
      itemOffset
      checkDigitOffset
    }
  }
`;

interface GetPEBConfigsData {
  getPEBConfigs: [PEBConfig];
}

export const useGetPEBConfigs = (allConfigs: string) => {
  const { loading, data, error } = useQuery<GetPEBConfigsData>(GET_PEG_CONFIGS, {
    variables: { allConfigs },
  });

  return {
    pebLoading: loading,
    pebConfigData: data?.getPEBConfigs,
    error,
  };
};
