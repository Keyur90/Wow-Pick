import { gql, useMutation } from '@apollo/client';
import { UpdateStatus, UpdateTrolleyStatusInput } from '@rf2/picking/data/api-contracts';

export const UPDATE_TROLLEY_STATUS = gql`
  mutation updateTrolleyStatus($updateTrolleyStatusInput: UpdateTrolleyStatusInput) {
    updateTrolleyStatus(updateTrolleyStatusInput: $updateTrolleyStatusInput) {
      success
      error
      id
      lastUpdatedUtcTimeTicks
    }
  }
`;

interface UpdateTrolleyStatusResponse {
  updateTrolleyStatus: UpdateStatus;
}

interface UpdateTrolleyStatusVars {
  updateTrolleyStatusInput: UpdateTrolleyStatusInput;
}

export const useUpdateTrolleyStatus = () => {
  const [mutate, { data, error }] = useMutation<UpdateTrolleyStatusResponse, UpdateTrolleyStatusVars>(
    UPDATE_TROLLEY_STATUS
  );

  return { mutate, data, error };
};
