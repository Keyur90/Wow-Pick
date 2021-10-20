import { gql, useMutation } from '@apollo/client';
import { AddExtraTotes } from '@rf2/picking/data/api-contracts';
import { cloneDeep as _cloneDeep } from 'lodash';
import { GET_NEXT_TRIP } from '../queries/getNextTrip';

export const ADD_EXTRA_TOTES = gql`
  mutation addExtraTotes($addExtraTotesInput: AddExtraTotesInput) {
    addExtraTotes(addExtraTotesInput: $addExtraTotesInput) {
      totes {
        id
        orderNo
        position
        pickingZoneId
        pickingZoneName
        barcode
      }
    }
  }
`;

interface AddExtraTotesData {
  addExtraTotes: AddExtraTotes;
}

export const useAddExtraTotes = (userName, branchNo, trolleyType, onAddExtraTotesComplete) => {
  const [addExtraTotes, { data: addExtraTotesData, error, loading }] = useMutation<AddExtraTotesData>(ADD_EXTRA_TOTES, {
    update(cache, { data: { addExtraTotes } }) {
      const { getNextTrip } = cache.readQuery({ query: GET_NEXT_TRIP, variables: { userName, branchNo, trolleyType } });
      const getNextTripClone = _cloneDeep(getNextTrip);

      cache.writeQuery({
        query: GET_NEXT_TRIP,
        data: { getNextTrip: { ...getNextTripClone, totes: [...getNextTrip.totes, ...addExtraTotes.totes] } },
        variables: { userName, branchNo, trolleyType },
      });
    },
    onCompleted() {
      onAddExtraTotesComplete();
    },
  });

  return { addExtraTotes, addExtraTotesData, error, loading };
};
