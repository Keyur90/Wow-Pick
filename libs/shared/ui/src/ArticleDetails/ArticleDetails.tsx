import React, { useState } from 'react';
import { trim as _trim, capitalize as _capitalize } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ImageIcon from '@material-ui/icons/Image';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { Container, FormattedAmount, ImageDialog } from '@rf2/ui';
import { ToteItem, Order, Collectible } from '@rf2/picking/data/api-contracts';

interface ArticleDetailsPropTypes {
  toteItem: ToteItem | Collectible;
  order?: Order;
  isRfRedesignPickToPictureEnabled?: boolean;
}

const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2, 0, 0),
    background: theme.palette.common.white,
    borderBottom: '1px solid #E0E0E0',
    marginBottom: theme.spacing(2),
  },
  description: {
    minHeight: 100,
    borderBottom: '1px solid #F3F3F7',
    paddingBottom: theme.spacing(2.25),
    fontWeight: 500,
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    color: '#171C1F',
  },
  details: {
    margin: theme.spacing(1.5, 0, 2),
    display: 'flex',
    alignItems: 'center',
    color: '#616C71',
    opacity: 0.8,
    fontSize: '1.125rem',
    fontWeight: 400,
    lineHeight: '1.3125rem',
  },
  articleId: {
    padding: theme.spacing(0, 1, 0, 0),
    borderRight: '1px solid #E5E5E5',
  },
  amountDetails: {
    marginLeft: theme.spacing(1),
  },
  imageButtonWrapper: {
    margin: theme.spacing(-2, -1, -2, 'auto'),
  },
  imageButton: {
    color: '#283136',
    padding: theme.spacing(1),
    marginTop: theme.spacing(0),
  },
}));

const ArticleDetails: React.FC<ArticleDetailsPropTypes> = ({
  order,
  toteItem,
  isRfRedesignPickToPictureEnabled = false,
}) => {
  const classes = useStyles();
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const { article, articleId, secondaryArticleId } = toteItem;
  const [isTruncated, setIsTruncated] = useState(false);
  const truncatedDescription = _capitalize(
    [_trim(article.brand), _trim(article.genericName), _trim(article.variety)].join(' ')
  );
  const volumeDetails = article.volumeSize ? article.volumeSize.toLowerCase() : '';

  const handleTruncateReflow = (rleState) => {
    const { clamped } = rleState;
    setIsTruncated(clamped);
  };

  return (
    <div className={classes.content}>
      <div className={classes.description}>
        <Container>
          <ResponsiveEllipsis
            text={isTruncated ? truncatedDescription : `${truncatedDescription} ${volumeDetails}`}
            maxLine="3"
            ellipsis={`... ${volumeDetails}`}
            trimRight
            basedOn="letters"
            onReflow={handleTruncateReflow}
          />
        </Container>
      </div>
      <Container>
        <div className={classes.details}>
          <div className={classes.articleId}>
            {articleId}
            {secondaryArticleId && <>/{secondaryArticleId}</>}
          </div>
          {order && (
            <div className={classes.amountDetails}>
              <FormattedAmount amount={order.orderPrice} />
            </div>
          )}
          {isRfRedesignPickToPictureEnabled && (
            <div className={classes.imageButtonWrapper}>
              <IconButton
                aria-label="article"
                className={classes.imageButton}
                onClick={() => setIsImageDialogOpen(true)}
              >
                <ImageIcon fontSize="inherit" />
              </IconButton>
            </div>
          )}
        </div>
      </Container>
      <ImageDialog
        isOpen={isImageDialogOpen}
        onToggle={(isOpen) => setIsImageDialogOpen(isOpen)}
        imageUrl={article.imageUrl}
        errorText={'Sorry, the image for this article is currently unavailable.'}
      />
    </div>
  );
};

export { ArticleDetails };
