import React, {useState} from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Step from './step.js';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop:10
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  elem:{
    textAlign:"center",
    width:600*0.8,
    height:1000,
    paddingTop:"2rem"
  },
  mm: {
    maxWidth: 400,
    flexGrow: 1,
    background:'#fff'
  },
}));

const man = [{
  'title':'메타마스크 설치', 
  'detail':['Go를 눌러 이더리움 지갑을 설치합니다.'],
  'img':"./meta.png",
  'btn':'on',
  'link':"https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko",
  'h':200
},{
  'title':'메타마스크 확장프로그램으로 추가', 
  'detail':[`설치한 메타마스크를 확장 프로그램으로 추가합니다.` ,
  `크롬의 오른쪽 상단에 있는 메타마스크 아이콘인 여우 모양 아이콘을 눌러주세요. 만약 메타마스크가 안보이시면 ‘플러그인 버튼’을 눌러주세요 메타마스크를 핀해주세요.`],
  'img':"./add.png",
  'h':500
},{
  'title':'메타마스크 지갑 생성', 
  'detail':[`아래 페이지에서 지갑을 가져오거나 지갑을 생성해주세요`,
`* 메타마스크 지갑을 가지고 있다면, ‘지갑 가져오기’ 버튼을 눌러 시드 구문을 입력해주세요.`,
`* 메타마스크 사용이 처임인 경우 ‘지갑 생성하기’ 버튼을 눌러 다음 단계를 진행해주세요.`],
  'img':"./new.png",
  'h':343
},{
  'title':'메타마스크 패스워드 설정', 
  'detail':['메타마스크의 개인 비밀번호를 만들 수 있습니다.','비밀번호는 8자 이상으로 설정해야하며, 그 외의 조건은 없습니다. 여기서 만드는 비밀번호는 메타마스크에 접속할 때 사용하는 비밀번호입니다.'],
  'img':"./pass.png",
  'h':288
},{
  'title':'메타마스크 백업 구문', 
  'detail':['이제 비밀 백업 구문을 확인해야 합니다. 자물쇠 모양을 클릭하면 문장처럼 보이는 단어들의 조합을 확인할 수 있습니다.','이 백업 구문은 금고 비밀번호입니다. 이 문장은 꼭 복사해서 보관하시는것을 추천드립니다!','이 문장을 잊어버리면 지갑을 다시는 찾을 수 없으며,지갑 안에 있는 암호화폐도 전부 잃어버리게 됩니다.','비밀 백업 구문이 노출될 경우 지갑의 소유권이 넘어갈 확률이 높습니다. 지금 다른 곳에 단어들을 순서대로 복사하여 기록해놓기 바랍니다! 다음 단계에서 이 비밀 백업 구문을 확인합니다. 만약 기록을 하지 않았다면 처음 단계부터 다시 시작해야합니다.'],
  'img':"./gu.png",
  'h':400
},{
  'title':'테스트 네트워크로 변경', 
  'detail':['테스트 네트워크로 환경을 변경합니다.'],
  'img':"./rop.JPG",
  'h':976
},{
  'title':'이더리움 구매', 
  'detail':['구매 버튼을 눌러 테스트 네트워크의 무료 이더리움을 받습니다.'],
  'img':"./buy.JPG",
  'h':976
},{
  'title':'포시트 테스트', 
  'detail':['포시트 테스트를 눌러 이더리움을 받기 위해 사이트로 이동합니다.'],
  'img':"./ether.JPG",
  'h':976
},{
  'title':'이더리움 요청', 
  'detail':['request 1 ether 를 누르시면 이더리움을 한 개 받으실 수 있습니다.', '사이트로 돌아가서 다시 F5를 누르시고 나면 사용이 가능합니다.'],
  'img':"./req.JPG",
  'h':376
}];

export default () => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
      <Grid
      className={classes.root}
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={3}
      >
         <MobileStepper
      variant="dots"
      steps={9}
      position="static"
      activeStep={activeStep}
      className={classes.mm}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === 8}>
          Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          Back
        </Button>
      }
    />
        <Grid item className={classes.elem}>
          <Step props={man[activeStep]}/>
        </Grid>
       
      </Grid>
  );
};
