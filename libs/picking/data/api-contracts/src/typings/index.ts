
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum TrolleyStatus {
    PACK = "PACK",
    COMPLETE = "COMPLETE"
}

export enum OrderDispatchStatus {
    ORDERALREADYDISPATCHED = "ORDERALREADYDISPATCHED",
    ORDERCANCELLED = "ORDERCANCELLED",
    ORDERNOTFOUND = "ORDERNOTFOUND"
}

export enum TrolleyType {
    normal = "normal",
    express = "express"
}

export interface SuppliedDetailInput {
    type?: Nullable<string>;
    articleId?: Nullable<string>;
    scanDetails?: Nullable<Nullable<ScanDetailInput>[]>;
}

export interface ScanDetailInput {
    storePrice?: Nullable<number>;
    barcode?: Nullable<string>;
    suppliedPrice?: Nullable<number>;
    quantity?: Nullable<number>;
    weight?: Nullable<number>;
    batchNo?: Nullable<string>;
    expiryDate?: Nullable<string>;
    dataBar?: Nullable<string>;
    placedInToteId?: Nullable<string>;
}

export interface SuppliedToteItemInput {
    userName?: Nullable<string>;
    branchNo?: Nullable<string>;
    trolleyId?: Nullable<string>;
    id?: Nullable<string>;
    suppliedDetails?: Nullable<Nullable<SuppliedDetailInput>[]>;
    lastUpdatedUtcTimeTicks?: Nullable<string>;
}

export interface SuppliedCollectibleInput {
    userName?: Nullable<string>;
    branchNo?: Nullable<string>;
    trolleyId?: Nullable<string>;
    id?: Nullable<string>;
    suppliedQuantity?: Nullable<number>;
    lastUpdatedUtcTimeTicks?: Nullable<string>;
}

export interface MoveToteItemInput {
    userName: string;
    branchNo: string;
    toteItemId: string;
    originalToteId: string;
    newToteId: string;
}

export interface SuppliedFreeSampleInput {
    userName?: Nullable<string>;
    branchNo?: Nullable<string>;
    trolleyId?: Nullable<string>;
    isSupplied?: Nullable<boolean>;
    id?: Nullable<string>;
    lastUpdatedUtcTimeTicks?: Nullable<string>;
}

export interface PrintToteLabelsInput {
    userName: string;
    branchNo: string;
    printerPoolId: string;
}

export interface AddExtraTotesInput {
    userName: string;
    branchNo: string;
    trolleyId?: Nullable<string>;
    orderNo?: Nullable<string>;
    pickingZoneId?: Nullable<number>;
    pickingZoneName?: Nullable<string>;
    count?: Nullable<number>;
    printerPoolId?: Nullable<string>;
    currentToteIds?: Nullable<Nullable<string>[]>;
}

export interface UpdateTrolleyStatusInput {
    userName?: Nullable<string>;
    branchNo?: Nullable<string>;
    id?: Nullable<string>;
    lastUpdatedUtcTimeTicks?: Nullable<string>;
    elapsedTime?: Nullable<number>;
    trolleyStatus?: Nullable<TrolleyStatus>;
}

export interface PrintDeliveryBagLabelsInput {
    userName: string;
    branchNo: string;
    orderNo?: Nullable<string>;
    pickingZoneId: number;
    pickingZoneName: string;
    barcode: string;
    labelCount: number;
    printerId: string;
}

export interface ElapsedTimeInput {
    trolleyId: string;
    elapsedTime: number;
}

export interface PrintCollectBagLabelsInput {
    userName: string;
    branchNo: string;
    orderNo?: Nullable<string>;
    position: number;
    labelCount: number;
    barcode: string;
    printerId: string;
}

export interface Tote {
    __typename?: 'Tote';
    id?: Nullable<string>;
    orderNo?: Nullable<string>;
    position?: Nullable<number>;
    pickingZoneId?: Nullable<number>;
    pickingZoneName?: Nullable<string>;
    barcode?: Nullable<string>;
}

export interface ToteLabel {
    __typename?: 'ToteLabel';
    id: string;
    orderNo?: Nullable<string>;
    position: number;
    deliveryMethod: string;
    pickingZoneId: number;
    barcode: string;
    isNoBags?: Nullable<boolean>;
    isFlatFee?: Nullable<boolean>;
}

export interface DeliveryLabel {
    __typename?: 'DeliveryLabel';
    id: string;
    orderNo?: Nullable<string>;
    position: number;
    pickingZoneId: number;
    pickingZoneName: string;
    barcode: string;
}

export interface CollectLabel {
    __typename?: 'CollectLabel';
    id: string;
    orderNo?: Nullable<string>;
    position: number;
    pickingZoneId: number;
    barcode: string;
}

export interface Order {
    __typename?: 'Order';
    id?: Nullable<string>;
    shortCode?: Nullable<string>;
    orderPrice?: Nullable<number>;
    personalShopperNotes?: Nullable<string>;
    deliveryDate?: Nullable<string>;
    locationCode?: Nullable<number>;
    transitCode?: Nullable<string>;
    customerName?: Nullable<string>;
    packagingType?: Nullable<string>;
    deliveryMethod?: Nullable<string>;
    isFlatFee?: Nullable<boolean>;
}

export interface Article {
    __typename?: 'Article';
    id?: Nullable<string>;
    brand?: Nullable<string>;
    genericName?: Nullable<string>;
    variety?: Nullable<string>;
    description?: Nullable<string>;
    volumeSize?: Nullable<string>;
    eachMultiplier?: Nullable<number>;
    useWeightRange?: Nullable<boolean>;
    minWeight?: Nullable<number>;
    maxWeight?: Nullable<number>;
    minShelfLife?: Nullable<number>;
    isPerishable?: Nullable<boolean>;
    preferredShelfLife?: Nullable<number>;
    weightPrimaryTolerance?: Nullable<number>;
    weightSecondaryTolerance?: Nullable<number>;
    weightOverride?: Nullable<boolean>;
    unitPrice?: Nullable<number>;
    pricingUnit?: Nullable<string>;
    imageUrl?: Nullable<string>;
    wontScanKg?: Nullable<boolean>;
    wontScanEach?: Nullable<boolean>;
    wscanQuantityLimit?: Nullable<number>;
    productRecall?: Nullable<boolean>;
    productWithdrawal?: Nullable<boolean>;
    barcodes?: Nullable<Nullable<EAN>[]>;
}

export interface EAN {
    __typename?: 'EAN';
    barcode?: Nullable<string>;
    barcodeType?: Nullable<string>;
    isPrimary?: Nullable<boolean>;
}

export interface ToteItem {
    __typename?: 'ToteItem';
    id?: Nullable<string>;
    lastUpdatedUtcTimeTicks?: Nullable<string>;
    toteId?: Nullable<string>;
    itemIndex?: Nullable<number>;
    orderNo?: Nullable<string>;
    articleId?: Nullable<string>;
    secondaryArticleId?: Nullable<string>;
    orderedQuantity?: Nullable<number>;
    silentSubbed?: Nullable<boolean>;
    isSubstitutable?: Nullable<boolean>;
    isSubstituted?: Nullable<boolean>;
    aisle?: Nullable<string>;
    bay?: Nullable<string>;
    shelf?: Nullable<string>;
    currentPage?: Nullable<number>;
    totalPages?: Nullable<number>;
    stockOnHand?: Nullable<number>;
    article?: Nullable<Article>;
    price?: Nullable<number>;
    personalShopperNotes?: Nullable<string>;
    suppliedDetails?: Nullable<Nullable<SuppliedDetail>[]>;
    totalSuppliedQuantity?: Nullable<number>;
}

export interface Collectible {
    __typename?: 'Collectible';
    id?: Nullable<string>;
    lastUpdatedUtcTimeTicks?: Nullable<string>;
    itemIndex?: Nullable<number>;
    orderNo?: Nullable<string>;
    articleId?: Nullable<string>;
    secondaryArticleId?: Nullable<string>;
    article?: Nullable<Article>;
    toteId?: Nullable<string>;
    orderedQuantity?: Nullable<number>;
    stockOnHand?: Nullable<number>;
    suppliedQuantity?: Nullable<number>;
    totalSuppliedQuantity?: Nullable<number>;
}

export interface FreeSample {
    __typename?: 'FreeSample';
    id?: Nullable<string>;
    lastUpdatedUtcTimeTicks?: Nullable<string>;
    description?: Nullable<string>;
    suppliedQuantity?: Nullable<number>;
    isSupplied?: Nullable<boolean>;
    toteId?: Nullable<string>;
    orderNo?: Nullable<string>;
}

export interface GetNextTrip {
    __typename?: 'GetNextTrip';
    id?: Nullable<string>;
    branchNo?: Nullable<number>;
    isNewTrolley?: Nullable<boolean>;
    pickingDone?: Nullable<boolean>;
    lastUpdatedUtcTimeTicks?: Nullable<string>;
    isExpress?: Nullable<boolean>;
    trolleyType?: Nullable<string>;
    trolleyStatus?: Nullable<number>;
    goalTime?: Nullable<number>;
    elapsedTime?: Nullable<number>;
    bonusTime?: Nullable<number>;
    isBulk?: Nullable<boolean>;
    orders?: Nullable<Nullable<Order>[]>;
    totes?: Nullable<Nullable<Tote>[]>;
    toteItems?: Nullable<Nullable<ToteItem>[]>;
    collectibles?: Nullable<Nullable<Collectible>[]>;
    freeSamples?: Nullable<Nullable<FreeSample>[]>;
}

export interface PrinterPool {
    __typename?: 'PrinterPool';
    id: string;
    name: string;
}

export interface PrintersPoolList {
    __typename?: 'PrintersPoolList';
    printerPools: Nullable<PrinterPool>[];
}

export interface IQuery {
    __typename?: 'IQuery';
    getNextTrip(userName: string, branchNo: string, trolleyType?: Nullable<string>): Nullable<GetNextTrip> | Promise<Nullable<GetNextTrip>>;
    getPrintersPoolList(branchNo: string): Nullable<PrintersPoolList> | Promise<Nullable<PrintersPoolList>>;
    getPEBConfigs(allConfigs: string): Nullable<Nullable<PEBConfig>[]> | Promise<Nullable<Nullable<PEBConfig>[]>>;
}

export interface SuppliedDetail {
    __typename?: 'SuppliedDetail';
    type?: Nullable<string>;
    articleId?: Nullable<string>;
    scanDetails?: Nullable<Nullable<ScanDetail>[]>;
}

export interface ScanDetail {
    __typename?: 'ScanDetail';
    storePrice?: Nullable<number>;
    barcode?: Nullable<string>;
    suppliedPrice?: Nullable<number>;
    quantity?: Nullable<number>;
    weight?: Nullable<number>;
    batchNo?: Nullable<string>;
    expiryDate?: Nullable<string>;
    dataBar?: Nullable<string>;
}

export interface UpdateStatus {
    __typename?: 'UpdateStatus';
    success?: Nullable<boolean>;
    error?: Nullable<Nullable<string>[]>;
    id?: Nullable<string>;
    lastUpdatedUtcTimeTicks?: Nullable<string>;
}

export interface PrintToteLabels {
    __typename?: 'PrintToteLabels';
    labels?: Nullable<Nullable<ToteLabel>[]>;
    error?: Nullable<string>;
}

export interface AddExtraTotes {
    __typename?: 'AddExtraTotes';
    success?: Nullable<boolean>;
    error?: Nullable<Nullable<string>[]>;
    id?: Nullable<string>;
    lastUpdatedUtcTimeTicks?: Nullable<string>;
    totes?: Nullable<Nullable<Tote>[]>;
}

export interface PrintDeliveryBagLabels {
    __typename?: 'PrintDeliveryBagLabels';
    labels?: Nullable<Nullable<DeliveryLabel>[]>;
}

export interface PrintCollectBagLabels {
    __typename?: 'PrintCollectBagLabels';
    labels?: Nullable<Nullable<CollectLabel>[]>;
}

export interface OrderDispatchResponse {
    __typename?: 'OrderDispatchResponse';
    success?: Nullable<boolean>;
    status?: Nullable<OrderDispatchStatus>;
}

export interface IMutation {
    __typename?: 'IMutation';
    supplyToteItem(suppliedToteItemInput?: Nullable<Nullable<SuppliedToteItemInput>[]>): Nullable<Nullable<UpdateStatus>[]> | Promise<Nullable<Nullable<UpdateStatus>[]>>;
    moveToteItem(moveToteItemInput?: Nullable<MoveToteItemInput>): Nullable<UpdateStatus> | Promise<Nullable<UpdateStatus>>;
    supplyCollectibles(suppliedCollectibleInput?: Nullable<Nullable<SuppliedCollectibleInput>[]>): Nullable<Nullable<UpdateStatus>[]> | Promise<Nullable<Nullable<UpdateStatus>[]>>;
    supplyFreeSamples(suppliedFreeSampleInput?: Nullable<Nullable<SuppliedFreeSampleInput>[]>): Nullable<Nullable<UpdateStatus>[]> | Promise<Nullable<Nullable<UpdateStatus>[]>>;
    resetCacheItem(userName: string, branchNo: string): Nullable<UpdateStatus> | Promise<Nullable<UpdateStatus>>;
    resetAll(): Nullable<UpdateStatus> | Promise<Nullable<UpdateStatus>>;
    printToteLabels(printToteLabelsInput?: Nullable<PrintToteLabelsInput>): Nullable<PrintToteLabels> | Promise<Nullable<PrintToteLabels>>;
    addExtraTotes(addExtraTotesInput?: Nullable<AddExtraTotesInput>): Nullable<AddExtraTotes> | Promise<Nullable<AddExtraTotes>>;
    printDeliveryBagLabels(printDeliveryBagLabelsInput?: Nullable<PrintDeliveryBagLabelsInput>): Nullable<PrintDeliveryBagLabels> | Promise<Nullable<PrintDeliveryBagLabels>>;
    updateElapsedTime(elapsedTimeInput?: Nullable<ElapsedTimeInput>): Nullable<UpdateStatus> | Promise<Nullable<UpdateStatus>>;
    printCollectBagLabels(printCollectBagLabelsInput?: Nullable<PrintCollectBagLabelsInput>): Nullable<PrintCollectBagLabels> | Promise<Nullable<PrintCollectBagLabels>>;
    dispatchOrder(orderNo: string): Nullable<OrderDispatchResponse> | Promise<Nullable<OrderDispatchResponse>>;
    updateTrolleyStatus(updateTrolleyStatusInput?: Nullable<UpdateTrolleyStatusInput>): Nullable<UpdateStatus> | Promise<Nullable<UpdateStatus>>;
}

export interface PEBConfig {
    __typename?: 'PEBConfig';
    id: number;
    description?: Nullable<string>;
    prefixStart?: Nullable<string>;
    prefixEnd?: Nullable<string>;
    barcodeLength?: Nullable<number>;
    priceOffset?: Nullable<number>;
    priceLength?: Nullable<number>;
    priceDecimals?: Nullable<number>;
    qtyOffset?: Nullable<number>;
    qtyLength?: Nullable<number>;
    qtyDecimals?: Nullable<number>;
    itemLength?: Nullable<number>;
    itemOffset?: Nullable<number>;
    checkDigitOffset?: Nullable<number>;
}

type Nullable<T> = T | null;
