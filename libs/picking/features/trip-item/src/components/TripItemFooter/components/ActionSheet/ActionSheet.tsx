import { List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { Backspace, EditLocation, ExitToApp, List as ListIcon, Notes } from '@material-ui/icons';
import { ToteItem } from '@rf2/picking/data/api-contracts';
import { returnToLegacyTrolleyMain } from '@rf2/shared/utility';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.common.black,
  },
}));

const useListItemTextStyles = makeStyles((theme) => ({
  primary: {
    color: theme.palette.common.black,
  },
}));

interface ActionSheetPropTypes {
  onClickViewUnSuppliedArticle?: () => void;
  onToggleDrawer?: (boolean) => void;
  viewAll: boolean;
  toteItem: ToteItem;
  onResetCurrentSuppliedItem: () => void;
  onShowOrderInformation: () => void;
}

const ActionSheet: React.FC<ActionSheetPropTypes> = ({
  onClickViewUnSuppliedArticle,
  onToggleDrawer,
  viewAll,
  toteItem,
  onResetCurrentSuppliedItem,
  onShowOrderInformation,
}) => {
  const classes = useStyles();
  const listItemTextClasses = useListItemTextStyles();
  const articleViewAllModeText = 'View all articles';
  const articleViewUnSuppliedModeText = 'View unsupplied articles';

  const handleClick = (tripItemCallback) => {
    onToggleDrawer(false);
    if (tripItemCallback) tripItemCallback();
  };

  return (
    <List>
      <ListItem button onClick={() => handleClick(onShowOrderInformation)}>
        <ListItemIcon className={classes.icon}>
          <Notes />
        </ListItemIcon>
        <ListItemText primary={'Order information'} classes={listItemTextClasses} />
      </ListItem>
      <ListItem button onClick={() => returnToLegacyTrolleyMain()}>
        <ListItemIcon className={classes.icon}>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText primary={'Exit trolley trip'} classes={listItemTextClasses} />
      </ListItem>
      <ListItem button>
        <ListItemIcon className={classes.icon}>
          <EditLocation />
        </ListItemIcon>
        <ListItemText primary={'Change article location'} classes={listItemTextClasses} />
      </ListItem>
      <ListItem button disabled={toteItem.totalSuppliedQuantity === 0}>
        <ListItemIcon className={classes.icon}>
          <Backspace />
        </ListItemIcon>
        <ListItemText
          primary={'Reset current supplied'}
          classes={listItemTextClasses}
          onClick={() => handleClick(onResetCurrentSuppliedItem)}
        />
      </ListItem>
      <ListItem button onClick={() => handleClick(onClickViewUnSuppliedArticle)}>
        <ListItemIcon className={classes.icon}>
          <ListIcon />
        </ListItemIcon>
        <ListItemText
          primary={viewAll ? articleViewUnSuppliedModeText : articleViewAllModeText}
          classes={listItemTextClasses}
        />
      </ListItem>
    </List>
  );
};

export { ActionSheet };
