import { add, format } from 'date-fns';

// const expiryDateFormat = 'dd-MMM';

export const calculateShelfLifeExpiryDate = (
  preferredShelfLife,
  minShelfLife,
  deliveryDate,
  defaultShelfLife,
  expiryDateFormat = 'dd-MMM'
) => {
  let preferredExpiryDate = '';
  let minExpiryDate = '';
  let defaultExpiryDate = '';
  if (preferredShelfLife && preferredShelfLife !== 0 && preferredShelfLife !== minShelfLife) {
    preferredExpiryDate = format(add(new Date(deliveryDate), { days: preferredShelfLife }), expiryDateFormat);
    minExpiryDate = format(add(new Date(deliveryDate), { days: minShelfLife }), expiryDateFormat);
  }

  if (minShelfLife && minShelfLife !== 0) {
    minExpiryDate = format(add(new Date(deliveryDate), { days: minShelfLife }), expiryDateFormat);
  }

  if (!minShelfLife) {
    defaultExpiryDate = format(add(new Date(deliveryDate), { days: defaultShelfLife }), expiryDateFormat);
  }

  return { preferredExpiryDate, minExpiryDate, defaultExpiryDate };
};
