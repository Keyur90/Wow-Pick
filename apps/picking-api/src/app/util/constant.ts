export const isPerishable = (perishableCode) => {
  const PerishableCode = 'P';
  return perishableCode?.toUpperCase() === PerishableCode;
};

export const ArticleType = {
  EACH: 'EACH',
  KG: 'KG',
};
