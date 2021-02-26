import React, { useState, useEffect, useCallback } from "react";
import { newContextComponents } from "@drizzle/react-components";
import Inspect from 'components/inspect/Inspect';
import style from 'css/Inspect.module.css';
import InspectorInfo from 'components/inspect/InspectorInfo';
import {Navbar, Nav} from 'react-bootstrap';
const { ContractForm } = newContextComponents;


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
  });

  /**
   * @description Because Drizzle cause to render too often in local testnet due to short blocktime,
   * exclude dependency from drizzle and drizzleState on purpose
   * After prototype, It will be using only drizzleState or not using drizzle, or include drizzle to dependency array
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
  
  if(inspector === false){
    return (
        <div className={style.registerContainer}>
            <h1>Register Inspector</h1>
            <ContractForm drizzle={drizzle} 
            contract="Inspect" 
            method="registerInspector"
                />
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
