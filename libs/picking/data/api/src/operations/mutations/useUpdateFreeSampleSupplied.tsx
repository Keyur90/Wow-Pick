import { gql, useMutation } from '@apollo/client';
import { SuppliedFreeSampleInput, UpdateStatus } from '@rf2/picking/data/api-contracts';

export const UPDATE_FREE_SAMPLE_SUPPLIED = gql`
  mutation supplyFreeSamples($suppliedFreeSampleInput: [SuppliedFreeSampleInput]) {
    supplyFreeSamples(suppliedFreeSampleInput: $suppliedFreeSampleInput) {
      success
      error
      id
      lastUpdatedUtcTimeTicks
    }
  }
`;

interface SupplyFreeSamplesResponse {
  supplyFreeSamples: UpdateStatus[];
}

interface SupplyFreeSamplesVars {
  suppliedFreeSampleInput: SuppliedFreeSampleInput[];
}

export const useUpdateFreeSampleSupplied = () => {
  const [mutate, { data, error }] = useMutation<SupplyFreeSamplesResponse, SupplyFreeSamplesVars>(
    UPDATE_FREE_SAMPLE_SUPPLIED
  );

  return { mutate, data, error };
};
