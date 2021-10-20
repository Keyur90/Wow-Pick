import { List, ListItem } from '@rf2/ui';
import { LabelledValue } from '@rf2/picking/features/trip-summary';
import { makeStyles } from '@material-ui/core/styles';

interface PickingStatusPropTypes {
  noOfIncompleteItems: number;
  noOfSubstitutedItems: number;
}

const useStyles = makeStyles((theme) => ({
  containerWrapper: {
    backgroundColor: theme.palette.common.white,
  },
}));

const PickingStatus: React.FC<PickingStatusPropTypes> = ({ noOfIncompleteItems, noOfSubstitutedItems }) => {
  const classes = useStyles();
  return (
    <div className={classes.containerWrapper}>
      <List>
        <ListItem>
          <LabelledValue label="Lines incomplete" value={noOfIncompleteItems} />
        </ListItem>
        <ListItem>
          <LabelledValue label="Substituted" value={noOfSubstitutedItems} />
        </ListItem>
      </List>
    </div>
  );
};

export { PickingStatus };
