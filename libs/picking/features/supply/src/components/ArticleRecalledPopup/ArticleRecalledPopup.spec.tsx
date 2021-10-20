import React from 'react';
import { render } from '@testing-library/react';
import { ArticleRecalledPopup } from './ArticleRecalledPopup';

test('renders ArticleRecalledPopup', () => {
  const { baseElement } = render(<ArticleRecalledPopup isOpen={true} onClose={null} />);

  expect(baseElement).toMatchSnapshot();
});
