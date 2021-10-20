// returns index of last un-suppliedItem
export const findIndexOfLastUnSuppliedItem = (toteItems) => {
  return toteItems?.flatMap((x) => x.totalSuppliedQuantity < x.orderedQuantity).lastIndexOf(true);
};
