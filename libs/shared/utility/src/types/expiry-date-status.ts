export enum ExpiryDateStatus {
  IsValid,
  ExpiryDateAfterPreferred, // 1 ok
  ExpiryDateAfterMinBeforePreferred, //2 proceed option
  ExpiryDateAfterTodayBeforeMin, //3 pick another article
  ExpiryDateBeforeToday, // 4 , 7 , 10 remove from shelf
  ExpiryDateAfterMinNoPreferred, //5 ok
  ExpiryDateAfterTodayBeforeMinNoPreferred, // 6 pick another article
  ExpiryDateAfterMinDefaultShelfLife, //8 ok
  ExpiryDateAfterTodayBeforeMinDefaultShelfLife, // 9 proceed
}
