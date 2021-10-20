import { ArticleType, ExpiryDateStatus, mockPEBConfigs } from '@rf2/shared/utility';
import { validateBarcode } from '..';

describe('Test validateBarcode', () => {
  const toteItemWithPreferredDate = {
    id: '586822',
    toteId: '2',
    orderNo: '140031681',
    articleId: '586822',
    stockOnHand: 6,
    itemIndex: 0,
    version: '0.0.1',
    orderedQuantity: 5,
    totalSuppliedQuantity: 0,
    price: 4.0,
    article: {
      description: 'Doritos CHEESE SUPREME 60G',
      id: '586822',
      brand: 'Doritos',
      pricingUnit: ArticleType.EACH,
      preferredShelfLife: 10,
      minShelfLife: 5,
      useWeightRange: false,
      barcodes: [
        {
          barcode: '9310015243714',
          barcodeType: 'ZF',
        },
      ],
    },
  };

  const toteItemWithMinDate = {
    id: '586822',
    toteId: '2',
    orderNo: '140031681',
    articleId: '586822',
    stockOnHand: 6,
    itemIndex: 0,
    version: '0.0.1',
    orderedQuantity: 5,
    totalSuppliedQuantity: 0,
    price: 4.0,
    article: {
      description: 'Doritos CHEESE SUPREME 60G',
      id: '586822',
      brand: 'Doritos',
      pricingUnit: ArticleType.EACH,
      minShelfLife: 5,
      useWeightRange: false,
      barcodes: [
        {
          barcode: '9310015243714',
          barcodeType: 'ZF',
        },
      ],
    },
  };

  const toteItemWithoutPreferredAndMinDate = {
    id: '586822',
    toteId: '2',
    orderNo: '140031681',
    articleId: '586822',
    stockOnHand: 6,
    itemIndex: 0,
    version: '0.0.1',
    orderedQuantity: 5,
    totalSuppliedQuantity: 0,
    price: 4.0,
    article: {
      description: 'Doritos CHEESE SUPREME 60G',
      id: '586822',
      brand: 'Doritos',
      pricingUnit: ArticleType.EACH,
      useWeightRange: false,
      barcodes: [
        {
          barcode: '9310015243714',
          barcodeType: 'ZF',
        },
      ],
    },
  };

  test.each([
    [
      '019310015243714 10123-ABC31031234561721091639021234',
      toteItemWithPreferredDate,
      true,
      true,
      1,
      '09/10/2021',
      ExpiryDateStatus.ExpiryDateAfterMinBeforePreferred,
    ],
    [
      '019310015243714 10123-ABC31031234561721092139021234',
      toteItemWithPreferredDate,
      true,
      true,
      1,
      '09/10/2021',
      ExpiryDateStatus.IsValid,
    ],
    [
      '019310015243714 10123-ABC31031234561721091239021234',
      toteItemWithPreferredDate,
      true,
      true,
      1,
      '09/10/2021',
      ExpiryDateStatus.ExpiryDateAfterTodayBeforeMin,
    ],
    [
      '019310015243714 10123-ABC31031234561720090739021234',
      toteItemWithPreferredDate,
      true,
      true,
      1,
      '09/10/2021',
      ExpiryDateStatus.ExpiryDateBeforeToday,
    ],
  ])(
    'Test validateBarcode with minimum and preferred date',
    (
      barcode,
      currentToteItem,
      enableDataBarScan,
      enableShelfLifeValidation,
      defaultShelfLife,
      deliveryDate,
      expiryDateStatus
    ) => {
      const result = validateBarcode(
        barcode,
        currentToteItem,
        enableDataBarScan,
        enableShelfLifeValidation,
        defaultShelfLife,
        deliveryDate,
        mockPEBConfigs,
        new Date(2021, 8, 8)
      );

      expect(result.expiryDateStatus).toBe(expiryDateStatus);
    }
  );

  test.each([
    [
      '019310015243714 10123-ABC31031234561721091539021234',
      toteItemWithMinDate,
      true,
      true,
      1,
      '09/10/2021',
      ExpiryDateStatus.IsValid,
    ],
    [
      '019310015243714 10123-ABC31031234561721091439021234',
      toteItemWithMinDate,
      true,
      true,
      1,
      '09/10/2021',
      ExpiryDateStatus.ExpiryDateAfterTodayBeforeMinNoPreferred,
    ],
    [
      '019310015243714 10123-ABC31031234561720091439021234',
      toteItemWithMinDate,
      true,
      true,
      1,
      '09/10/2021',
      ExpiryDateStatus.ExpiryDateBeforeToday,
    ],
  ])(
    'Test validateBarcode with minimum date',
    (
      barcode,
      currentToteItem,
      enableDataBarScan,
      enableShelfLifeValidation,
      defaultShelfLife,
      deliveryDate,
      expiryDateStatus
    ) => {
      const result = validateBarcode(
        barcode,
        currentToteItem,
        enableDataBarScan,
        enableShelfLifeValidation,
        defaultShelfLife,
        deliveryDate,
        mockPEBConfigs,
        new Date(2021, 8, 8)
      );

      expect(result.expiryDateStatus).toBe(expiryDateStatus);
    }
  );

  test.each([
    [
      '019310015243714 10123-ABC31031234561721091439021234',
      toteItemWithoutPreferredAndMinDate,
      true,
      true,
      1,
      '09/10/2021',
      ExpiryDateStatus.IsValid,
    ],
    [
      '019310015243714 10123-ABC31031234561721090839021234',
      toteItemWithoutPreferredAndMinDate,
      true,
      true,
      1,
      '09/10/2021',
      ExpiryDateStatus.ExpiryDateAfterTodayBeforeMinDefaultShelfLife,
    ],
    [
      '019310015243714 10123-ABC31031234561720090839021234',
      toteItemWithoutPreferredAndMinDate,
      true,
      true,
      1,
      '09/10/2021',
      ExpiryDateStatus.ExpiryDateBeforeToday,
    ],
  ])(
    'Test validateBarcode without minimum and preferred date',
    (
      barcode,
      currentToteItem,
      enableDataBarScan,
      enableShelfLifeValidation,
      defaultShelfLife,
      deliveryDate,
      expiryDateStatus
    ) => {
      const result = validateBarcode(
        barcode,
        currentToteItem,
        enableDataBarScan,
        enableShelfLifeValidation,
        defaultShelfLife,
        deliveryDate,
        mockPEBConfigs,
        new Date(2021, 8, 8)
      );

      expect(result.expiryDateStatus).toBe(expiryDateStatus);
    }
  );

  test('Should prompt for expiry date', () => {
    const result = validateBarcode(
      '019310015243714 10123-ABC39021234',
      toteItemWithoutPreferredAndMinDate,
      true,
      true,
      1,
      '09/10/2021',
      mockPEBConfigs,
      new Date(2021, 8, 8)
    );

    expect(result.promptExpiryDatePopup).toBe(true);
  });

  test('Should not do Databar logic if enableDataBarScan is false', () => {
    const result = validateBarcode(
      '019310015243714 10123-ABC39021234',
      toteItemWithoutPreferredAndMinDate,
      false,
      true,
      1,
      '09/10/2021',
      mockPEBConfigs,
      new Date(2021, 8, 8)
    );

    expect(result.isBarcodeMatchFound).toBe(false);
  });

  test('Should not perform shelf life validation if enableshelfvalidation is false', () => {
    const result = validateBarcode(
      '019310015243714 10123-ABC1721091839021234',
      toteItemWithPreferredDate,
      true,
      false,
      1,
      '09/10/2021',
      mockPEBConfigs,
      new Date(2021, 8, 8)
    );

    expect(result.expiryDateStatus).toBe(ExpiryDateStatus.IsValid);
  });

  test('Should check if article is expired if enableshelfvalidation is false', () => {
    const result = validateBarcode(
      '019310015243714 10123-ABC1720090839021234',
      toteItemWithoutPreferredAndMinDate,
      true,
      false,
      1,
      '09/10/2021',
      mockPEBConfigs,
      new Date(2021, 8, 8)
    );

    expect(result.expiryDateStatus).toBe(ExpiryDateStatus.ExpiryDateBeforeToday);
  });
});
