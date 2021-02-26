import React from 'react';
import {Button} from 'react-bootstrap';
import style from 'css/RegisterDefendee.module.css';

export default({ target, drizzle, drizzleState }) => {
    const web3 = drizzle.web3;

    function sendJudgeToServer(_domain, _defendeeName, _decision){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function (e) {
            if(xhr.reponse !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200) {
                let parsed = JSON.parse(xhr.response);
            } else {
                console.log('Error!');
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/judge/judgeTmp');
        xhr.setRequestHeader('Content-type','application/json');
        xhr.send(JSON.stringify({'domain':_domain, 'defendeeName':_defendeeName, 'decision' : _decision}));
    }

    function sendJudge(_domain, _defendeeName, _decision){
        
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function (e) {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200) {
                let parsed = JSON.parse(xhr.response);
                let abi = parsed.abi;
                let contract = new web3.eth.Contract(abi, parsed.networks[5777].address);
                let argDomain = await web3.utils.fromUtf8(_domain);
                let argName = await web3.utils.fromUtf8(_defendeeName);
                let argDecision = _decision? true:false;
                await contract.methods.judge(argDomain, argName, argDecision).send( {from:drizzleState.accounts[0], gas: 1000000});
            } else {
                console.log('Error!');
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/contractjson');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify({'type':'JudgeByMedia'}));
    }

    async function approve(){
        if(target){
            await sendJudge(target.domain, target.defendeeName, true);
        }
    }

    async function deny(){
        if(target){
            await sendJudge(target.domain, target.defendeeName, false);
        }
    }

    return(
        <div>
            <Button className={style.judgeBtm} variant="outline-success" onClick={()=>{approve();}}>Yes</Button>
            <Button className={style.judgeBtm} variant="outline-danger" onClick={()=>{deny();}}>No</Button>
        </div>
    );
}