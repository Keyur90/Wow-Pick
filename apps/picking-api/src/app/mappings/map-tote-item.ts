export const mapToteItem = (toteItem, totes) => {
  toteItem.orderNo = mapOrderNo(toteItem.toteId, totes);
  return toteItem;
};

export const mapOrderNo = (toteId, totes) => {
  return totes.find((t) => t.id == toteId)?.orderNo;
};
