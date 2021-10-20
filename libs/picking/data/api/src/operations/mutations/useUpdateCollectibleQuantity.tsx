import { gql, useMutation } from '@apollo/client';
import { SuppliedCollectibleInput, UpdateStatus } from '@rf2/picking/data/api-contracts';

export const UPDATE_SUPPLIED_COLLECTIBLES = gql`
  mutation supplyCollectibles($suppliedCollectibleInput: [SuppliedCollectibleInput]) {
    supplyCollectibles(suppliedCollectibleInput: $suppliedCollectibleInput) {
      success
      error
      id
      lastUpdatedUtcTimeTicks
    }
  }
`;

interface SupplyCollectibleResponse {
  supplyCollectibles: UpdateStatus[];
}

interface SupplyCollectibleVars {
  suppliedCollectibleInput: SuppliedCollectibleInput[];
}

export const useUpdateCollectibleQuantity = () => {
  const [mutate, { data, error }] = useMutation<SupplyCollectibleResponse, SupplyCollectibleVars>(
    UPDATE_SUPPLIED_COLLECTIBLES
  );

  return { mutate, data, error };
};
