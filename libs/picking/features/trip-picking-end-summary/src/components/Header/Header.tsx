import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Header as SharedHeader } from '@rf2/ui';

const Header: React.FC = () => (
  <SharedHeader>
    <Typography variant="h1" component="h1">
      Trip Status
    </Typography>
  </SharedHeader>
);

export { Header };
