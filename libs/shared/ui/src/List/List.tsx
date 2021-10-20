import React, { ReactNode } from 'react';
import { Container } from '../Container';
import { makeStyles } from '@material-ui/core/styles';

interface ListPropTypes {
  children: NonNullable<ReactNode>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: '1px solid #E0E0E0',
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.common.white,
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: theme.spacing(2, 0),
    '& li': {
      fontSize: '1.25rem',
      fontWeight: 400,
      lineHeight: '1.875rem',
      color: theme.palette.common.black,
      padding: theme.spacing(0, 0, 1),
      '&:last-child': {
        borderBottom: 'none',
        padding: theme.spacing(0),
      },
      display: 'flex',
      alignItems: 'center',
      '& > span': {
        marginRight: theme.spacing(2),
      },
      '& > svg': {
        color: '#3A474E',
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));

const List: React.FC<ListPropTypes> = React.memo(({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <ul className={classes.list}>{children}</ul>
      </Container>
    </div>
  );
});

export { List };
