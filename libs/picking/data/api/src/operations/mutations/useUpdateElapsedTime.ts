import { gql, useMutation } from '@apollo/client';
import { ElapsedTimeInput, UpdateStatus } from '@rf2/picking/data/api-contracts';

export const UPDATE_ELAPSED_TIME = gql`
  mutation updateElapsedTime($elapsedTimeInput: ElapsedTimeInput) {
    updateElapsedTime(elapsedTimeInput: $elapsedTimeInput) {
      success
    }
  }
`;

export interface ElapsedTimeInputResponse {
  elapsedTimeInputResponse: UpdateStatus;
}

export interface ElapsedTimeRequest {
  elapsedTimeInput: ElapsedTimeInput;
}

export const useUpdateElapsedTime = () => {
  const [mutate, { data, error }] = useMutation<ElapsedTimeInputResponse, ElapsedTimeRequest>(UPDATE_ELAPSED_TIME);

  return { mutate, data, error };
};
