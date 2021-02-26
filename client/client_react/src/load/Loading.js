import React from "react";

export default () => {
  
  return (
    <div style={{'padding':'3rem'}}>
        Loading...<br/>
        만약 메타마스크를 설치하지 않았다면,<br/>
        <a target="_blank" rel="noopener noreferrer" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko">
            https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=ko
        </a><br/>
        에서 설치해 주십시오.<br/><br/><br/>
        설치후 절차는 아래를 따라하시고 새로고침(F5)하시면 실행됩니다.<br />
        <div>
          <h3>1. Metamask 설치 및 새 지갑 생성</h3>
          <img style={{'width':'30rem'}} src={process.env.REACT_APP_URL + "/metamask.PNG"} alt="img1"/><br />
        </div><br />
        <div>
          <h3>2. Metamask 고정</h3>
          <img style={{'width':'20rem'}} src={process.env.REACT_APP_URL + "/fix.PNG"} alt="img2"/><br />
        </div><br />
        <div>
          <h3>3. 테스트 서버로 이동</h3>
          <img style={{'width':'20rem'}} src={process.env.REACT_APP_URL + "/testserver.PNG"} alt="img3"/><br />
        </div><br />
        <div>
          <h3>4. Buy 버튼 클릭</h3>
          <img style={{'width':'20rem'}} src={process.env.REACT_APP_URL + "/buy.PNG"} alt="img4"/><br />
        </div>
        <div>
          <h3>5. 파우셋 테스트 클릭</h3>
          <img style={{'width':'20rem'}} src={process.env.REACT_APP_URL + "/faucet.PNG"} alt="img5"/><br />
        </div><br />
        <div>
          <h3>5. request 1 ether from faucet 클릭</h3>
          무료 1eth를 받습니다. 테스트서버의 이더리움으로 아무 가치가 없습니다.<br /> 
          <img style={{'width':'20rem'}} src={process.env.REACT_APP_URL + "/request.PNG"} alt="img6"/><br />
        </div>
    </div>
  );
};
