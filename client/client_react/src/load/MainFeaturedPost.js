import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {useDispatch} from 'react-redux';
import {changeMenu} from './indexSlice.js';
const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height:'100ch',
    textAlign:"center"
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  btn:{
    marginTop:'30ch',
    height:'10ch'
  },
  title:{
      color:'#fff',
      fontSize:'10ch',
      textAlign:'left',
      paddingLeft:'2ch',
      paddingTop:'5ch'
  }
}));

export default function MainFeaturedPost(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { post } = props;
  const handleClick = () => {
    dispatch(changeMenu(1));
  };
  return (
    <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${post.image})` }}>
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
      <div className={classes.overlay} />
      <Grid container alignItems="center">
        <Grid item md xs>
            <div className={classes.title}>
            Decentralized<br />
            Monitoring Protocol
            </div>
            <Button className={classes.btn} variant="contained" color="secondary" onClick={handleClick}>
                    Let's start
            </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object,
};