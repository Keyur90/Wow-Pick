import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import BackspaceIcon from '@material-ui/icons/Backspace';

import { ActionDrawer } from '../ActionDrawer';

export default {
  title: 'Components/ActionDrawer',
  component: ActionDrawer,
};

export const ActionDrawerComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button color="primary" variant="contained" onClick={() => setIsOpen(!isOpen)} size={'large'}>
        Open Action Drawer
      </Button>
      <ActionDrawer isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary={'Hold trolley trip'} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ShuffleIcon />
            </ListItemIcon>
            <ListItemText primary={'Update article location'} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BackspaceIcon />
            </ListItemIcon>
            <ListItemText primary={'Reset current supplied'} />
          </ListItem>
        </List>
      </ActionDrawer>
    </>
  );
};
