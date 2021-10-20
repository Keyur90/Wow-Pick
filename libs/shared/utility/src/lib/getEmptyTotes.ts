import { GetNextTrip, Tote } from '@rf2/picking/data/api-contracts';
import { forEach as _forEach, reduce as _reduce } from 'lodash';

export const getEmptyTotes = (trip: GetNextTrip): Tote[] => {
  const emptyTotes = [];
  if (trip) {
    const { totes, toteItems, collectibles, freeSamples } = trip;

    _forEach(totes, (tote) => {
      let suppliedDetails = _reduce(
        toteItems,
        (sum, { toteId, totalSuppliedQuantity }) => (toteId === tote.id ? totalSuppliedQuantity + sum : sum),
        0
      );

      suppliedDetails += _reduce(
        collectibles,
        (sum, { toteId, totalSuppliedQuantity }) => (toteId === tote.id ? totalSuppliedQuantity + sum : sum),
        0
      );

      suppliedDetails += _reduce(
        freeSamples,
        (sum, { toteId, suppliedQuantity }) => (toteId === tote.id ? suppliedQuantity + sum : sum),
        0
      );

      if (suppliedDetails === 0) {
        emptyTotes.push(tote);
      }
    });
  }
  return emptyTotes;
};
