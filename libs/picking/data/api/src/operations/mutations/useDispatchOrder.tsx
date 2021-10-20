import { gql, useMutation } from '@apollo/client';

export const DISPATCH_ORDER = gql`
  mutation dispatchOrder($orderNo: String!) {
    dispatchOrder(orderNo: $orderNo) {
      success
      status
    }
  }
`;

export const useDispatchOrder = () => {
  const [mutate, { data, error, loading }] = useMutation(DISPATCH_ORDER);

  return { mutate, dispatchData: data, error, loading };
};
