import React from 'react';
import { Backdrop, CircularProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/material/styles';
import Portal from '@mui/material/Portal';


const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    color: theme.palette.background.default,
  },
}));

export const Loader = (props) => {
  const classes = useStyles();

  return (
    <>
    <Portal container={props.container}>
      <Backdrop className={classes.backdrop} open={props.openLoader}>
        <CircularProgress color="inherit" />
        <Typography component="h5" variant="h5">
          {props.loaderMessage}
        </Typography>
      </Backdrop>
    </Portal>
    </>
  );
};
