import React, { ReactNode } from 'react';

interface ListItemPropTypes {
  children: NonNullable<ReactNode>;
}

const ListItem: React.FC<ListItemPropTypes> = ({ children }) => <li>{children}</li>;

export { ListItem };
