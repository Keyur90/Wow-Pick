import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import { FormattedAmount } from '../FormattedAmount';
import { ImageDialog } from '../ImageDialog';

interface ProductCardPropsType {
  title: string;
  code: string;
  price: number;
  image: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '&:last-child': {
      padding: theme.spacing(2, 2, 0.5, 2),
    },
  },
  content: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    paddingBottom: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
    borderBottom: '1px solid #E0E0E0',
    '& h2': {
      fontSize: '1.25rem',
      lineHeight: '1.875rem',
    },
  },
  imageButton: {
    color: '#4A90E2',
  },
  pullRight: {
    marginLeft: 'auto',
  },
}));

const ProductCard: React.FC<ProductCardPropsType> = ({ title, code, price, image }) => {
  const classes = useStyles();
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  const onToggleImageDialog = (force?: boolean) => {
    setIsImageDialogOpen(force ? force : !isImageDialogOpen);
  };

  return (
    <>
      <Card>
        <CardContent className={classes.root}>
          <div className={classes.content}>
            <Typography variant="h2">{title}</Typography>
          </div>

          <Grid container spacing={2} alignItems={'center'}>
            <Grid item>
              <Typography variant="body2">{code}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                <FormattedAmount amount={price} />
              </Typography>
            </Grid>
            <Grid item className={classes.pullRight}>
              <IconButton
                className={classes.imageButton}
                color="inherit"
                aria-label="view image"
                onClick={() => onToggleImageDialog(true)}
                size={'small'}
              >
                <VisibilityIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ImageDialog isOpen={isImageDialogOpen} onToggle={onToggleImageDialog} imageUrl={image} />
    </>
  );
};

export { ProductCard };
