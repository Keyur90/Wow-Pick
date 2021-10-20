import { parse, isBefore, isAfter, isEqual } from 'date-fns';
import { calculateShelfLifeExpiryDate } from '..';
import { ExpiryDateStatus } from '../types/expiry-date-status';

export const validateExpiryDate = (
  preferredShelfLife,
  minShelfLife,
  deliveryDate,
  defaultShelfLife,
  articleExpiryDate,
  today = new Date()
): ExpiryDateStatus => {
  const { preferredExpiryDate, minExpiryDate, defaultExpiryDate } = calculateShelfLifeExpiryDate(
    preferredShelfLife,
    minShelfLife,
    deliveryDate,
    defaultShelfLife,
    'dd-MMM-yyyy'
  );

  today.setHours(0, 0, 0, 0);
  const expiryDate = minExpiryDate ? parse(minExpiryDate, 'dd-MMM-yyyy', today) : '';
  const preferredDate = preferredExpiryDate ? parse(preferredExpiryDate, 'dd-MMM-yyyy', today) : '';
  const defaultExpiry = defaultExpiryDate ? parse(defaultExpiryDate, 'dd-MMM-yyyy', today) : '';
  if (isBefore(articleExpiryDate, today)) {
    return ExpiryDateStatus.ExpiryDateBeforeToday;
  }

  if (preferredDate && expiryDate) {
    if (
      isBefore(articleExpiryDate, preferredDate) &&
      (isAfter(articleExpiryDate, expiryDate) || isEqual(articleExpiryDate, expiryDate))
    ) {
      return ExpiryDateStatus.ExpiryDateAfterMinBeforePreferred;
    }

    if (
      isBefore(articleExpiryDate, expiryDate) &&
      (isAfter(articleExpiryDate, today) || isEqual(articleExpiryDate, today))
    ) {
      return ExpiryDateStatus.ExpiryDateAfterTodayBeforeMin;
    }
  }

  if (!preferredDate && expiryDate) {
    if (isBefore(articleExpiryDate, expiryDate)) {
      return ExpiryDateStatus.ExpiryDateAfterTodayBeforeMinNoPreferred;
    }
  }

  if (!preferredExpiryDate && !minExpiryDate && defaultExpiry) {
    if (
      isBefore(articleExpiryDate, defaultExpiry) &&
      (isAfter(articleExpiryDate, today) || isEqual(articleExpiryDate, today))
    ) {
      return ExpiryDateStatus.ExpiryDateAfterTodayBeforeMinDefaultShelfLife;
    }

    if (isAfter(articleExpiryDate, defaultExpiry) || isEqual(articleExpiryDate, defaultExpiry)) {
      return ExpiryDateStatus.IsValid;
    }
  }

  if (preferredDate && (isAfter(articleExpiryDate, preferredDate) || isEqual(articleExpiryDate, preferredDate))) {
    return ExpiryDateStatus.IsValid;
  }

  if (
    !preferredDate &&
    expiryDate &&
    (isAfter(articleExpiryDate, expiryDate) || isEqual(articleExpiryDate, expiryDate))
  ) {
    return ExpiryDateStatus.IsValid;
  }
};
