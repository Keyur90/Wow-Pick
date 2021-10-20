import { PackagingTypes } from './constants';

export const bagTypeToColor = (bagType?: string): string => {
  switch (bagType) {
    case PackagingTypes.PLASTIC:
      return '#0074BC';
    case PackagingTypes.PAPER:
      return '#299A53';
    default:
      return '#BD161C';
  }
};

export const bagTypeToText = (bagType?: string): string => {
  switch (bagType) {
    case PackagingTypes.PLASTIC:
      return 'Plastic';
    case PackagingTypes.PAPER:
      return 'Paper';
    default:
      return 'No Bags';
  }
};
