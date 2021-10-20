import React from 'react';

import { List } from '../List';
import { ListItem } from '../ListItem';

export default {
  title: 'Components/List',
  component: List,
};

export const ListComponent = () => {
  return (
    <List>
      <ListItem>List item 1</ListItem>
      <ListItem>List item 2</ListItem>
      <ListItem>List item 3</ListItem>
    </List>
  );
};
