import React, { ReactNode } from 'react';
import Drawer from '@material-ui/core/Drawer';

interface ActionDrawerPropTypes {
  isOpen: boolean;
  onToggle: (force?: boolean) => void;
  children: NonNullable<ReactNode>;
}

const ActionDrawer: React.FC<ActionDrawerPropTypes> = ({ isOpen, onToggle, children }) => (
  <Drawer anchor={'bottom'} open={isOpen} onClose={() => onToggle(false)}>
    {children}
  </Drawer>
);

export { ActionDrawer };
