import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  elem:{
    textAlign:"left",
    width:"50%",
    paddingTop:"1rem"
  }
}));


export default () => {
  const classes = useStyles();
  return (
      <Grid
        className={classes.root}
        container
        direction="row"
        justify="left"
        alignItems="center"
        >
        
      </Grid>
  );
};
