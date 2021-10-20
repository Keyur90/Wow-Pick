import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Header as SharedHeader } from '@rf2/ui';
import React from 'react';
import { useHistory } from 'react-router-dom';

interface HeaderPropTypes {
  showTitle: boolean;
}

const useStyles = makeStyles((theme) => ({
  backButton: {
    marginRight: theme.spacing(2),
  },
}));

const Header: React.FC<HeaderPropTypes> = ({ showTitle }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <SharedHeader>
      {showTitle && (
        <>
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
            Printer Selection
          </Typography>
        </>
      )}
    </SharedHeader>
  );
};

export { Header };
