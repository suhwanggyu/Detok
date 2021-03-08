import React, {useState} from "react";
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
    paddingTop:"2rem"
  }
}));


export default ({ drizzle, drizzleState }) => {
  const classes = useStyles();
  return (
      <Grid
      className={classes.root}
      container
      direction="column"
      justify="left"
      alignItems="center"
      >
        <Grid item className={classes.elem}>
        Loading... 메타마스크를 통해 로그인 중입니다.<br/>
        만약 메타마스크를 설치하지 않았다면,<br/>
        <a target="_blank" rel="noopener noreferrer" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko">
            https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko
        </a><br/>
        에서 설치해 주십시오.<br/><br/><br/>
        
        현재 Ropsten 테스트 네트워크에 연결되어 있기 때문에, 아래의 절차를 수행해 주시고, 새로고침(F5)하시면 실행됩니다.<br />
        </Grid>
        <Grid item className={classes.elem}>
          <h3>1. Metamask 설치 및 새 지갑 생성</h3>
          <img style={{'width':'30rem'}} src={process.env.REACT_APP_URL + "/metamask.PNG"} alt="img1"/><br />
        </Grid>
        <Grid item className={classes.elem}>
          <h3>2. Metamask 고정</h3>
          <img style={{'width':'20rem'}} src={process.env.REACT_APP_URL + "/fix.PNG"} alt="img2"/><br />
        </Grid>
        <Grid item className={classes.elem}>
          <h3>3. 테스트 서버로 이동</h3>
          <img style={{'width':'20rem'}} src={process.env.REACT_APP_URL + "/testserver.PNG"} alt="img3"/><br />
        </Grid><br />
        <Grid item className={classes.elem}>
          <h3>4. Buy 버튼 클릭</h3>
          <img style={{'width':'20rem'}} src={process.env.REACT_APP_URL + "/buy.PNG"} alt="img4"/><br />
        </Grid>
        <Grid item className={classes.elem}>
          <h3>5. 파우셋 테스트 클릭</h3>
          <img style={{'width':'20rem'}} src={process.env.REACT_APP_URL + "/faucet.PNG"} alt="img5"/><br />
          </Grid><br />
        <Grid item className={classes.elem}>
          <h3>5. request 1 ether from faucet 클릭</h3>
          무료 1eth를 받습니다. 테스트서버의 이더리움으로 아무 가치가 없습니다.<br /> 
          <img style={{'width':'20rem'}} src={process.env.REACT_APP_URL + "/request.PNG"} alt="img6"/><br />
        </Grid>
      </Grid>
  );
};
