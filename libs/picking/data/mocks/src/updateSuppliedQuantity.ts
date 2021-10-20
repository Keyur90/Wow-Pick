export const updateSuppliedQuantitySuccessResultMock = {
  result: {
    data: {
      updateSuppliedQuantity: {
        success: true,
      },
    },
  },
};

export const updateSuppliedQuantityErrorResultMock = {
  result: {
    errors: [
      {
        message: 'toteItem not found',
        locations: null,
        path: ['updateSuppliedQuantity'],
        nodes: null,
        source: null,
        positions: null,
        originalError: null,
        extensions: null,
        name: null,
      },
    ],
    data: {
      updateSuppliedQuantity: null,
    },
  },
};
