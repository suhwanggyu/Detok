import React from 'react';
import Markdown from '../load/Markdown.js';
import { post } from './post.js';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
      position: 'relative',
      backgroundColor: theme.palette.grey[100],
      marginBottom: theme.spacing(4),
      height:'100%',
      padding:'3ch'
    },
}));

export default ({props}) => {
    const classes = useStyles();
    console.log(props.name);
    return (
        <Paper className={classes.mainFeaturedPost}>
            <Markdown props={post[props.name]} />
        </Paper>
    );
};