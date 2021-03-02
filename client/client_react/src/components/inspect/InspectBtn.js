import React from 'react';
import {Button} from 'react-bootstrap';
import style from 'css/Inspect.module.css';

export default({ target, handleShow, drizzle, drizzleState }) => {
    const web3 = drizzle.web3;
    function sendInspectToServer(_domain, _defendeeName){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function (e) {
            if(xhr.reponse !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200) {
                console.log('Inspect send to server');
            } else {
                console.log('Error!');
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/inspect/inspectTmp');
        xhr.setRequestHeader('Content-type','application/json');
        xhr.send(JSON.stringify({'domain':_domain, 'defendeeName':_defendeeName, 'address':drizzleState.accounts[0]}));
    }

    function sendInspect(_domain, _defendeeName, _decision){
        
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function (e) {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200) {
                let parsed = JSON.parse(xhr.response);
                let abi = parsed.abi;
                let contract = new web3.eth.Contract(abi, parsed.networks[process.env.REACT_APP_ID].address);
                let argDomain = await web3.utils.fromUtf8(_domain);
                let argName = await web3.utils.fromUtf8(_defendeeName);
                let argDecision = _decision? true:false;
                await contract.methods.inspect(argDomain, argName, argDecision).send( {from:drizzleState.accounts[0], gas: 300000});
            } else {
                console.log('Error!');
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/contractjson');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify({'type':'Inspect'}));
    }

    function approve(){
        if(target){
            sendInspect(target[0].domain, target[0].defendeeName, true);
            sendInspectToServer(target[0].domain, target[0].defendeeName);
        }
    }

    function deny(){
        if(target){
            sendInspect(target[0].domain, target[0].defendeeName, false);
            sendInspectToServer(target[0].domain, target[0].defendeeName);
        }
    }
    
    function pass(){
        if(target){
            sendInspectToServer(target[0].domain, target[0].defendeeName);
        }
    }
    return(
        <div>
            <Button className={style.judgeBtm} variant="outline-success" onClick={()=>{approve();handleShow()}}>Yes</Button>
            <Button className={style.judgeBtm} variant="outline-primary" onClick={()=>{pass();handleShow()}}>Pass</Button>
            <Button className={style.judgeBtm} variant="outline-danger" onClick={()=>{deny();handleShow()}}>No</Button>
        </div>
    );
}