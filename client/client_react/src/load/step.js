import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 600*0.8,
    margin:'auto'
  },
  media: {
    height:300,
  },
});

export default function MediaCard({props}) {
  const classes = useStyles();
  const Btn = () => {
      if(props.btn != undefined){
          return(
            <Button size="small" color="primary">
                <a target="_blank" rel="noopener noreferrer" href={props.link}>
                    Go
                </a>
            </Button>
          );
      } else {
          return (<div/>);
      }
  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          style={{height:props.h*0.8}}
          image={props.img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {props.title}
          </Typography>
          
          {props.detail.map((post) => (
        <Typography style={{textAlign:'left'}} variant="h6" color="textPrimary" component="h2">
            {post}
        </Typography>
      ))}
          
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Btn/>
      </CardActions>
    </Card>
  );
}