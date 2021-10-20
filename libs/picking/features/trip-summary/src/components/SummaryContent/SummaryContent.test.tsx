import React from 'react';
import { render } from '@testing-library/react';
import { SummaryContent } from './SummaryContent';

test('renders SummaryContent', () => {
  const { container } = render(
    <SummaryContent isBulkTrip={false} totes={1} articles={24} labels={1} goalTime={360} isExpressTrip={false} />
  );

  expect(container).toMatchSnapshot();
});

test('renders SummaryContent bulk trip', () => {
  const { getByText } = render(
    <SummaryContent isBulkTrip={true} totes={1} articles={24} labels={1} goalTime={360} isExpressTrip={false} />
  );

  expect(getByText(/Bulk trolley trip/i)).toBeInTheDocument();
});
