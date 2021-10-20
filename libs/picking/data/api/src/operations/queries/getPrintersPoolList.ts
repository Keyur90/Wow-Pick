import { gql, useQuery } from '@apollo/client';
import { PrintersPoolList } from '@rf2/picking/data/api-contracts';

export const GET_PRINTERS_POOL_LIST = gql`
  query getPrintersPoolList($branchNo: String!) {
    getPrintersPoolList(branchNo: $branchNo) {
      printerPools {
        id
        name
      }
    }
  }
`;

interface PrintersPoolListData {
  getPrintersPoolList: PrintersPoolList;
}

export const useGetPrintersPoolList = (branchNo: string) => {
  const { loading, data, error } = useQuery<PrintersPoolListData>(GET_PRINTERS_POOL_LIST, {
    variables: { branchNo },
  });

  return {
    loading,
    data: data?.getPrintersPoolList,
    error,
  };
};
