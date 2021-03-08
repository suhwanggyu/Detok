import React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
const useStyles = makeStyles((theme) => ({
  post: {
    textAlign:"left"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

const styles = (theme) => ({
  pitem: {
    marginTop: theme.spacing(2),
  },
  im:{
    height:'100ch',
    width:'100ch'
  }
});

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h4',
      },
    },
    h2: { component: Typography, props: { gutterBottom: true, variant: 'h5' } },
    h3: { component: Typography, props: { gutterBottom: true, variant: 'subtitle1' } },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: 'caption', paragraph: true },
    },
    a: { component:({children, ...props }) => (
      <img
        src={children}
        title="Paella dish"
        style={{width:'100%', height:'auto'}}
      />
    )}, 
    b: { component:({children, ...props }) => (
      <img
        src={children}
        title="Paella dish"
        style={{width:'100%', height:'auto'}}
      />
    )},
    p: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <p className={classes.pitem}>
          <Typography component="span" style={{fontSize:'2.5ch'}} {...props} />
        </p>
      )),
    },
    li: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <li className={classes.pitem}>
          <Typography component="span" style={{fontSize:'2.5ch'}} {...props} />
        </li>
      )),
    },
    code:{
      component:({children, ...props }) => (
        <code style={{fontSize:'2.5ch'}}>
          {children}
        </code>
      ),
    }
  }
};

export default function Markdown({props}) {
  const classes = useStyles();
  return (
    <ReactMarkdown className={classes.post} options={options}>
      {props}
    </ReactMarkdown>
  );
}