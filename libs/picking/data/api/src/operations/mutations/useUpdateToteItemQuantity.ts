import { gql, useMutation } from '@apollo/client';
import { SuppliedToteItemInput, UpdateStatus } from '@rf2/picking/data/api-contracts';

export const UPDATE_SUPPLIED_QUANTITY = gql`
  mutation supplyToteItem($suppliedToteItemInput: [SuppliedToteItemInput]) {
    supplyToteItem(suppliedToteItemInput: $suppliedToteItemInput) {
      success
      error
      id
      lastUpdatedUtcTimeTicks
    }
  }
`;

export interface SupplyToteItemResponse {
  supplyToteItem: UpdateStatus[];
}

export interface SupplyToteItemVars {
  suppliedToteItemInput: SuppliedToteItemInput[];
}

export const useUpdateToteItemQuantity = () => {
  const [mutate, { data, error }] = useMutation<SupplyToteItemResponse, SupplyToteItemVars>(UPDATE_SUPPLIED_QUANTITY);

  return { mutate, data, error };
};
