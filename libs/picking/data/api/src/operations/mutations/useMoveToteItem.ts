import { gql, useMutation } from '@apollo/client';
import { MoveToteItemInput, UpdateStatus } from '@rf2/picking/data/api-contracts';

export const MOVE_TOTE_ITEM = gql`
  mutation moveToteItem($moveToteItemInput: MoveToteItemInput) {
    moveToteItem(moveToteItemInput: $moveToteItemInput) {
      success
    }
  }
`;

export interface MoveToteItemResponse {
  moveToteItemResponse: UpdateStatus;
}

export interface MoveToteItemRequest {
  moveToteItemInput: MoveToteItemInput;
}

export const useMoveToteItem = () => {
  const [mutate, { data, error }] = useMutation<MoveToteItemResponse, MoveToteItemRequest>(MOVE_TOTE_ITEM);

  return { mutate, data, error };
};
