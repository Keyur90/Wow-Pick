import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Header } from '@rf2/ui';

const useStyles = makeStyles((theme) => ({
  backButton: {
    marginRight: theme.spacing(2),
  },
}));

const SummaryHeader: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Header>
      <IconButton
        edge="start"
        className={classes.backButton}
        color="inherit"
        aria-label="back"
        onClick={() => history.push('/')}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h1" component="h1">
        Trip Summary
      </Typography>
    </Header>
  );
};

export { SummaryHeader };
