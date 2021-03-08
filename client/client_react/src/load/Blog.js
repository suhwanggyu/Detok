import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import {useSelector} from 'react-redux';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import Footer from './Footer';
import Technology from '../present/technology.js';
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  { title: 'Home', url: '#' , value:0},
  { title: 'Technology', url: '#', value:2},
  { title: 'Design', url: '#' , value:3},
  { title: 'Policy', url: '#' , value:4},
  { title: 'Developer', url: '#' , value:5}
];

const mainFeaturedPost = {
  title: 'Detok',
  image: 'https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile1.uf.tistory.com%2Fimage%2F99BE77335A02FAD1204FF7'
};




export default function Blog() {
  const menu = useSelector(state => state.index.menu);
  const classes = useStyles();
  const Menu = () => {
    console.log(menu);
    switch(menu){
      case 0 :
        return (
          <MainFeaturedPost post={mainFeaturedPost} />
        );
      case 2 :
        return (
          <Technology props={{name:"techpost"}}/>
        );
      case 3 :
        return (
          <Technology props={{name:"designpost"}}/>
        );
      case 4 :
        return (
          <Technology props={{name:"policypost"}}/>
        );
      case 5 :
        return (
          <Technology props={{name:"developerpost"}}/>
        );
      default :
        return (
          <MainFeaturedPost post={mainFeaturedPost} />
        );
    }
  };
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Detok" sections={sections} />
        <main>
          <Menu/>
        </main>
      </Container>

      <Footer title="Detok" description="" />
    </React.Fragment>
  );
}