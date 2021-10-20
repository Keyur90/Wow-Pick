/* eslint-disable @typescript-eslint/ban-types */

import {
  ApolloCache,
  ApolloLink,
  DocumentNode,
  FetchResult,
  gql,
  NextLink,
  Observable,
  Operation,
} from '@apollo/client';

const ToteItemLastUpdatedFragment = gql`
  fragment ToteItemLastUpdated on ToteItem {
    id
    lastUpdatedUtcTimeTicks
  }
`;

const CollectibleLastUpdatedFragment = gql`
  fragment CollectibleLastUpdated on Collectible {
    id
    lastUpdatedUtcTimeTicks
  }
`;

const FreeSampleLastUpdatedFragment = gql`
  fragment FreeSampleLastUpdated on FreeSample {
    id
    lastUpdatedUtcTimeTicks
  }
`;

const GetNextTripLastUpdatedFragment = gql`
  fragment GetNextTripLastUpdated on GetNextTrip {
    id
    lastUpdatedUtcTimeTicks
  }
`;

type OperationMetadata = { typeName: string; inputVariableName: string; readLastUpdatedFragment: DocumentNode };

const lastUpdatedOperationsMetadata: { [operationName: string]: OperationMetadata } = {
  supplyToteItem: {
    inputVariableName: 'suppliedToteItemInput',
    typeName: 'ToteItem',
    readLastUpdatedFragment: ToteItemLastUpdatedFragment,
  },
  supplyCollectibles: {
    inputVariableName: 'suppliedCollectibleInput',
    typeName: 'Collectible',
    readLastUpdatedFragment: CollectibleLastUpdatedFragment,
  },
  supplyFreeSamples: {
    inputVariableName: 'suppliedFreeSampleInput',
    typeName: 'FreeSample',
    readLastUpdatedFragment: FreeSampleLastUpdatedFragment,
  },
  updateTrolleyStatus: {
    inputVariableName: 'updateTrolleyStatusInput',
    typeName: 'GetNextTrip',
    readLastUpdatedFragment: GetNextTripLastUpdatedFragment,
  },
};

export class LastUpdatedTicksLink extends ApolloLink {
  constructor() {
    super();
  }

  request(operation: Operation, forward?: NextLink): Observable<FetchResult> | null {
    // console.log('LastUpdatedTicksLink', operation.operationName);
    const operationMetadata = lastUpdatedOperationsMetadata[operation.operationName];
    const cache = operation.getContext().cache as ApolloCache<object>;
    if (!operationMetadata || !cache) return forward(operation);

    this.before(operation, operationMetadata, cache);

    return forward(operation).map((response) => {
      this.after(response, operation, operationMetadata, cache);
      return response;
    });
  }

  private before(operation: Operation, operationMetadata: OperationMetadata, cache: ApolloCache<object>): void {
    const input = operation.variables[operationMetadata.inputVariableName];
    if (!input) return;

    if (Array.isArray(input))
      input.forEach((inputItem) => this.enrichRequestObject(inputItem, operationMetadata, cache));
    else this.enrichRequestObject(input, operationMetadata, cache);

    // console.log('LastUpdatedTicksLink:BEFORE ', operation.variables);
  }

  private after(response, operation: Operation, operationMetadata: OperationMetadata, cache: ApolloCache<object>) {
    const responseData = response.data?.[operation.operationName];
    if (!responseData) return;

    if (Array.isArray(responseData))
      responseData.forEach((responseDataItem) => this.updateLocalCache(responseDataItem, operationMetadata, cache));
    else this.updateLocalCache(responseData, operationMetadata, cache);

    // console.log('LastUpdatedTicksLink:AFTER ', responseData);
  }

  private enrichRequestObject(obj, operationMetadata: OperationMetadata, cache: ApolloCache<object>) {
    if (!obj || !obj.id) return;

    // Get the current latest lastUpdatedUtcTimeTicks value from apollo client cache
    const { lastUpdatedUtcTimeTicks } = cache.readFragment({
      fragment: operationMetadata.readLastUpdatedFragment,
      id: `${operationMetadata.typeName}:${obj.id}`,
    });

    // Set lastUpdatedUtcTimeTicks to the request variables
    if (lastUpdatedUtcTimeTicks) obj.lastUpdatedUtcTimeTicks = lastUpdatedUtcTimeTicks;
  }

  private updateLocalCache(obj, operationMetadata: OperationMetadata, cache: ApolloCache<object>) {
    if (!obj || !obj.id || !obj.lastUpdatedUtcTimeTicks) return;

    // Set lastUpdatedUtcTimeTicks in apollo client cache
    cache.modify({
      id: `${operationMetadata.typeName}:${obj.id}`,
      fields: {
        lastUpdatedUtcTimeTicks() {
          return obj.lastUpdatedUtcTimeTicks;
        },
      },
      broadcast: false, // last updated date is not displayed or used anywhere in UI, so no need to refresh ui
    });
  }
}
