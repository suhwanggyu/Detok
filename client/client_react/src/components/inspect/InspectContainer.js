import React, { useState, useEffect, useCallback } from "react";
import Inspect from 'components/inspect/Inspect';
import style from 'css/Inspect.module.css';
import InspectorInfo from 'components/inspect/InspectorInfo';
import {Navbar, Nav, Button} from 'react-bootstrap';

export default ({ drizzle, drizzleState}) => {
  const [inspector, setInspector] = useState(false);
  const [key, setKey] = useState(1);
  useEffect(()=>{
    if(inspector === false) {
      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = (e) => {
          if(xhr.readyState !== XMLHttpRequest.DONE) return;
          if(xhr.status === 200) {
              let parsed = JSON.parse(xhr.response);
              setInspector(parsed.isInspector);
          } else {
              console.log("error!");
          }
      }
      xhr.open('POST',process.env.REACT_APP_API + '/inspect');
      xhr.setRequestHeader('Content-type','application/json');
      xhr.send(JSON.stringify({'address':drizzleState.accounts[0]}));
    }
  },[drizzleState]);

  /**
   * @description Because Drizzle cause to render too often in local testnet due to short blocktime,
   * exclude dependency from drizzle and drizzleState on purpose
   * After prototype, It will be using only drizzleState or not using drizzle, or include drizzle to dependency array
   * 해당 부분에서 고의적으로 hook의 drizzle에 대한 dependency를 제거하였습니다.
   */
  const InspectContent = useCallback(() =>{
    if(key === 1) {
      return (
        <Inspect drizzle={drizzle} drizzleState={drizzleState}/>
      );
    }
    if(key === 2) {
      return (
        <div> This is prototype </div>
      );
    }
    if(key === 3) {
      return (
        <div> This is prototype </div>
      );
    }
  },[key]);

  function reg(){
    const web3 = drizzle.web3;
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = async function (e) {
        if(xhr.readyState !== XMLHttpRequest.DONE) return;
        if(xhr.status === 200) {
            let parsed = JSON.parse(xhr.response);
            let abi = parsed.abi;
            let contract = new web3.eth.Contract(abi, parsed.networks[process.env.REACT_APP_ID].address);
            console.log(contract.methods);
            await contract.methods.registerInspector().send( {from:drizzleState.accounts[0], gas: 300000});
        } else {
            console.log('Error!');
        }
    }
    xhr.open('POST',process.env.REACT_APP_API + '/contractjson');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify({'type':'Inspect'}));
  }

  if(inspector === false){
    return (
        <div className={style.registerContainer}>
            <h1>Register Inspector</h1>
            <Button variant="outline-primary" onClick={reg}>Register</Button>
        </div>
    );
  }

  if(inspector === true) {
    return (
      <div>
        <Navbar className={style.naviReport} bg="light" variant="light">
                <Nav className="mr-auto">
                    <Nav.Link className={key === 1 ? 'active' : ''} onClick={()=>setKey(1)}>Random</Nav.Link>
                    <Nav.Link className={key === 2 ? 'active' : ''} onClick={()=>setKey(2)}>Follow</Nav.Link>
                    <Nav.Link className={key === 3 ? 'active' : ''} onClick={()=>setKey(3)}>Select</Nav.Link>
                </Nav>
        </Navbar>
        <InspectContent />
        <div className={style.infoBox}><InspectorInfo drizzleState={drizzleState}/></div>
      </div>
    );
  }
};
