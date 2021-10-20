import { BarcodeType, mockPEBConfigs } from '../..';
import { parseAndValidatePEBBarcode } from '../PEBBarcodeParser';

describe('PEBBarcodeParser', () => {
  it('return valid parsed PEBBarcode for 2021390000003', async () => {
    const parsedBarcode = parseAndValidatePEBBarcode('2021390000003', mockPEBConfigs);

    expect(parsedBarcode).toBeTruthy();
    expect(parsedBarcode.barcodeType).toBe(BarcodeType.PEB);
    expect(parsedBarcode.calculatedBarcode).toBe('2021390000003');
    expect(parsedBarcode.retrievePrice).toBe(0);
    expect(parsedBarcode.suppliedPrice).toBeFalsy();
    expect(parsedBarcode.retrievedBarcode).toBe('2021390000003');
  });

  it('return valid parsed PEBBarcode for 2100000020812', async () => {
    const parsedBarcode = parseAndValidatePEBBarcode('2100000020812', mockPEBConfigs);

    expect(parsedBarcode).toBeTruthy();
    expect(parsedBarcode.barcodeType).toBe(BarcodeType.PEB);
    expect(parsedBarcode.calculatedBarcode).toBe('2100000000005');
    expect(parsedBarcode.retrievePrice).toBe(20.81);
    expect(parsedBarcode.suppliedPrice).toBe(20.81);
    expect(parsedBarcode.retrievedBarcode).toBe('2100000020812');
  });

  it('return valid parsed PEBBarcode for 2100003611277', async () => {
    const parsedBarcode = parseAndValidatePEBBarcode('2100003611277', mockPEBConfigs);

    expect(parsedBarcode).toBeTruthy();
    expect(parsedBarcode.barcodeType).toBe(BarcodeType.PEB);
    expect(parsedBarcode.calculatedBarcode).toBe('2100000000005');
    expect(parsedBarcode.retrievePrice).toBe(611.27);
    expect(parsedBarcode.suppliedPrice).toBe(611.27);
    expect(parsedBarcode.retrievedBarcode).toBe('2100003611277');
  });

  it('return valid parsed PEBBarcode for 269931031800', async () => {
    const parsedBarcode = parseAndValidatePEBBarcode('269931031800', mockPEBConfigs);

    expect(parsedBarcode).toBeTruthy();
    expect(parsedBarcode.barcodeType).toBe(BarcodeType.PEB);
    expect(parsedBarcode.calculatedBarcode).toBe('269931000002');
    expect(parsedBarcode.retrievePrice).toBe(31.8);
    expect(parsedBarcode.suppliedPrice).toBe(31.8);
    expect(parsedBarcode.retrievedBarcode).toBe('269931031800');
  });

  it('return valid parsed PEBBarcode for Prefix Range 20-29 len_12 : 278697012006', async () => {
    const parsedBarcode = parseAndValidatePEBBarcode('278697012006', mockPEBConfigs);

    expect(parsedBarcode).toBeTruthy();
    expect(parsedBarcode.barcodeType).toBe(BarcodeType.PEB);
    expect(parsedBarcode.calculatedBarcode).toBe('278697000003');
    expect(parsedBarcode.retrievePrice).toBe(12);
    expect(parsedBarcode.suppliedPrice).toBe(12);
    expect(parsedBarcode.retrievedBarcode).toBe('278697012006');
  });

  it('return valid parsed PEBBarcode for Prefix Range 20-29 : 2699310318004', async () => {
    const parsedBarcode = parseAndValidatePEBBarcode('2699310318004', mockPEBConfigs);

    expect(parsedBarcode).toBeTruthy();
    expect(parsedBarcode.barcodeType).toBe(BarcodeType.PEB);
    expect(parsedBarcode.calculatedBarcode).toBe('2699310000008');
    expect(parsedBarcode.retrievePrice).toBe(318);
    expect(parsedBarcode.suppliedPrice).toBe(318);
    expect(parsedBarcode.retrievedBarcode).toBe('2699310318004');
  });

  it('return valid parsed PEBBarcode for Prefix 02 : 269931020000', async () => {
    const parsedBarcode = parseAndValidatePEBBarcode('269931020000', mockPEBConfigs);

    expect(parsedBarcode).toBeTruthy();
    expect(parsedBarcode.barcodeType).toBe(BarcodeType.PEB);
    expect(parsedBarcode.calculatedBarcode).toBe('269931000002');
    expect(parsedBarcode.retrievePrice).toBe(20);
    expect(parsedBarcode.suppliedPrice).toBe(20);
    expect(parsedBarcode.retrievedBarcode).toBe('269931020000');
  });
});
