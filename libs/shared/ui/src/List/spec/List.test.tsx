import React from 'react';
import { render } from '@testing-library/react';
import { List } from '../List';
import { ListItem } from '../ListItem';

test('renders Container', () => {
  const { container } = render(
    <List>
      <ListItem>List item 1</ListItem>
      <ListItem>List item 2</ListItem>
      <ListItem>List item 3</ListItem>
    </List>
  );

  expect(container).toMatchSnapshot();
});
