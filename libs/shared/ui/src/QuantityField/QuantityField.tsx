import React, { useState, useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';

interface QuantityFieldPropTypes {
  name: string;
  label: string;
  defaultValue: number;
  onFocus?: () => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error: boolean;
  errorText?: string;
  shouldFocus?: boolean;
  startAdornment?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInputBase-root': {
      marginBottom: theme.spacing(2.75),
      '&.Mui-error': {
        marginBottom: 0,
        '&.MuiOutlinedInput-colorSecondary.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.error.main,
        },
      },
      '& .MuiInputAdornment-root > p': {
        color: theme.palette.common.black,
      },
    },
    '& .Mui-error.MuiFormLabel-colorSecondary.Mui-focused': {
      color: theme.palette.error.main,
    },
    '& .MuiFormHelperText-contained': {
      marginLeft: 0,
    },
  },
}));

const QuantityField: React.FC<QuantityFieldPropTypes> = ({
  name,
  label,
  defaultValue,
  onFocus,
  onBlur,
  error,
  errorText,
  shouldFocus = true,
  startAdornment,
}) => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    if (shouldFocus) {
      inputRef.current.focus();
    }
  }, [shouldFocus]);

  useEffect(() => {
    if (hasFocus) {
      inputRef?.current?.select();
    }
  }, [hasFocus]);

  const onhandleFocus = () => {
    setHasFocus(true);
    if (onFocus) {
      onFocus();
    }
  };

  const onHandleBlur = (evt) => {
    setHasFocus(false);
    if (onBlur) {
      onBlur(evt);
    }
  };

  const hasError = !hasFocus && error;

  return (
    <TextField
      id={name}
      inputRef={inputRef}
      classes={classes}
      name={name}
      label={label}
      fullWidth
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      variant="outlined"
      defaultValue={defaultValue}
      onFocus={onhandleFocus}
      onBlur={onHandleBlur}
      error={hasError}
      helperText={hasError && errorText}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        startAdornment: startAdornment ? <InputAdornment position="start">{startAdornment}</InputAdornment> : null,
      }}
      color="secondary"
      autoComplete="off"
    />
  );
};

export { QuantityField };
