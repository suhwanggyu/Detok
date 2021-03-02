import React, { useState, useEffect } from "react";
import style from 'css/RegisterDefendee.module.css';
import {InputGroup, FormControl, Button} from 'react-bootstrap';


export default ({setRegistered, drizzle, drizzleState}) => {
    const [copyrighterName, setCopyrighterName] = useState("");

    function hadleChange(e){
        setCopyrighterName(e.target.value);
    }

    function sendRegister(){
        let web3 = drizzle.web3;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function (e) {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200) {
                let parsed = JSON.parse(xhr.response);
                let abi = parsed.abi;
                let contract = new web3.eth.Contract(abi, parsed.networks[process.env.REACT_APP_ID].address);
                let name = await web3.utils.fromUtf8(copyrighterName);
                await contract.methods.registerCopyrighter(name).send( {from:drizzleState.accounts[0], gas: 200000});
            } else {
                console.log('Error!');
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/contractjson');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify({'type':'JudgeByMedia'}));
    }

    return (
        <div className={style.registerCopyrighterContainer}>
            <h2>Register Coppyrighter</h2>
            <InputGroup  size="sm">
            <FormControl
                type="text"
                placeholder="Copyrighter Name"
                onChange={hadleChange}
                aria-label="Name"
                aria-describedby="basic-addon1"
                style={{'width':'5rem'}}
            />
            </InputGroup>
            <Button variant="primary" onClick={(e)=>{sendRegister();setRegistered(true)}}>
                Register
            </Button>
            <p>Because It register on block chain, It will take a time</p>
        </div>
    );
};