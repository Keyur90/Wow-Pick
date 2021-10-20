import React, { useState } from 'react';
import { Button as MuiButton, AppBar, Toolbar, Fab, makeStyles } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos, Keyboard } from '@material-ui/icons';
import { BottomActions, Button, ActionDrawer } from '@rf2/ui';
import { ActionSheet } from './components/ActionSheet';
import { ToteItem } from '@rf2/picking/data/api-contracts';

interface TripItemFooterPropTypes {
  onItemPrevious: () => void;
  onItemNext: () => void;
  onWScanClick: () => void;
  isWScanEnabled: boolean;
  canNavigatePrevious: boolean;
  onToggleView: () => void;
  viewAll: boolean;
  toteItem: ToteItem;
  onResetCurrentSuppliedItem: () => void;
  onShowOrderInformation: () => void;
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  manualScan: {
    position: 'absolute',
    bottom: 136,
    right: theme.spacing(2),
  },
}));

const useToolbarStyles = makeStyles((theme) => ({
  regular: {
    background: '#303030',
    borderTop: `1px solid ${theme.palette.common.black}`,
    padding: 0,
    minHeight: 64,
    display: 'flex',
    alignItems: 'stretch',
    '& > button': {
      width: '33.333333%',
      padding: theme.spacing(0, 2),
      textAlign: 'center',
      borderRadius: 0,
      letterSpacing: 0,
      lineHeight: '1rem',
      '&:first-child': {
        borderRight: `1px solid ${theme.palette.common.black}`,
      },
      '&:last-child': {
        borderLeft: `1px solid ${theme.palette.common.black}`,
      },
    },
  },
}));

const useMoreOptionsButtonStyles = makeStyles(() => ({
  label: {
    textTransform: 'initial',
  },
}));

const useNavButtonStyles = makeStyles(() => ({
  iconSizeMedium: {
    '& > svg:first-child': {
      fontSize: '1rem',
    },
  },
  disabled: {
    '& > .MuiButton-label': {
      color: '#888',
    },
  },
}));

const TripItemFooter: React.FC<TripItemFooterPropTypes> = ({
  onItemPrevious,
  onItemNext,
  onWScanClick,
  isWScanEnabled,
  canNavigatePrevious,
  onToggleView,
  viewAll,
  toteItem,
  onResetCurrentSuppliedItem,
  onShowOrderInformation,
}) => {
  const classes = useStyles();
  const toolbarClasses = useToolbarStyles();
  const moreOptionsButtonClasses = useMoreOptionsButtonStyles();
  const useNavButtonClasses = useNavButtonStyles();
  const [isActionDrawerOpen, setIsActionDrawerOpen] = useState(false);

  const onToggleActionDrawer = (force?: boolean) => {
    setIsActionDrawerOpen(force ? force : !isActionDrawerOpen);
  };

  const onSubstitue = () => {
    // on substitue
  };

  const onFwdClick = () => {
    onItemNext();
  };

  return (
    <>
      <BottomActions isPrimary={false}>
        <Button variant={'outlined'} onClick={onSubstitue}>
          Substitute
        </Button>
      </BottomActions>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar classes={toolbarClasses}>
          <MuiButton
            classes={useNavButtonClasses}
            color="inherit"
            onClick={onItemPrevious}
            startIcon={<ArrowBackIos />}
            disabled={!canNavigatePrevious}
          >
            BACK
          </MuiButton>
          <MuiButton classes={moreOptionsButtonClasses} color="inherit" onClick={() => setIsActionDrawerOpen(true)}>
            More Options
          </MuiButton>
          <MuiButton classes={useNavButtonClasses} color="inherit" onClick={onFwdClick} endIcon={<ArrowForwardIos />}>
            FWD
          </MuiButton>
        </Toolbar>
      </AppBar>
      <ActionDrawer isOpen={isActionDrawerOpen} onToggle={onToggleActionDrawer}>
        <ActionSheet
          onClickViewUnSuppliedArticle={onToggleView}
          onToggleDrawer={onToggleActionDrawer}
          viewAll={viewAll}
          toteItem={toteItem}
          onResetCurrentSuppliedItem={onResetCurrentSuppliedItem}
          onShowOrderInformation={onShowOrderInformation}
        />
      </ActionDrawer>
      <div className={classes.manualScan} hidden={!isWScanEnabled}>
        <Fab color="secondary" aria-label="manual scan" onClick={onWScanClick}>
          <Keyboard />
        </Fab>
      </div>
    </>
  );
};

export { TripItemFooter };
