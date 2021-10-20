import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { boolean } from '@storybook/addon-knobs';

import { BottomActions } from '../BottomActions';

export default {
  title: 'Components/BottomActions',
  component: BottomActions,
};

export const BottomActionsComponent = () => {
  const isPrimary = boolean('isPrimary', true);
  return (
    <BottomActions isPrimary={isPrimary}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button onClick={() => null} color="primary" variant="outlined" size={'large'} fullWidth>
            Footer action 1
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={() => null} color="primary" variant="outlined" size={'large'} fullWidth>
            Footer action 2
          </Button>
        </Grid>
      </Grid>
    </BottomActions>
  );
};
