import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { PrintersPoolList } from '@rf2/picking/data/api-contracts';
import { Container } from '@rf2/ui';
import React from 'react';

interface ContentPropTypes {
  printersPoolList: PrintersPoolList;
  onPoolSelection: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const useStyles = makeStyles((theme) => ({
  containerWrapper: {
    backgroundColor: theme.palette.common.white,
  },
  message: {
    padding: theme.spacing(2, 0),
  },
  formControl: {
    marginTop: theme.spacing(2),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Content: React.FC<ContentPropTypes> = ({ printersPoolList, onPoolSelection }) => {
  const classes = useStyles();

  return (
    <Container>
      <Typography className={classes.message} variant="h3" component="h3">
        Scan printer pool for locations to print labels.
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel id="printer-pools">Choose manually</InputLabel>
        <Select value="" onChange={onPoolSelection} className={classes.selectEmpty} labelId="printer-pools">
          {printersPoolList.printerPools.map(({ id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  );
};

export { Content };
