import React, {useState, useEffect, useMemo} from "react";
import RegisterDefendee from './defendee/RegisterDefendee';
import RegisterCopyrighter from 'components/copyrighter/RegisterCopyrighter';
import JudgeTarget from 'components/copyrighter/JudgeTarget';
import style from 'css/RegisterDefendee.module.css';
import {Navbar, Nav} from 'react-bootstrap';
import Token from 'components/account/Token';
import MyCardColumn from 'components/copyrighter/MyCardColumn';
export default ({ drizzle, drizzleState }) => {
    const [copyrighter, setIsCopyrighter] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [key, setKey] = useState(1);
    useEffect(()=>{
        if(copyrighter === false) {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = (e) => {
                if(xhr.readyState !== XMLHttpRequest.DONE) return;
                if(xhr.status === 200) {
                    let parsed = JSON.parse(xhr.response).result;
                    if(parsed[0] !== undefined){
                        setIsCopyrighter(true);
                    }
                } else {
                    console.log("ERROR 1000 : Backend response broken");
                }
            }
            xhr.open('POST',process.env.REACT_APP_API + '/defendee/isCopyrighter');
            xhr.setRequestHeader('Content-type','application/json');
            xhr.send(JSON.stringify({'address' : drizzleState.accounts[0]}));
        }
    },[copyrighter, registered]);

    
    const Content = () => {
        if(key === 1) {
            return (
                <JudgeTarget drizzle={drizzle} drizzleState={drizzleState}/>
            );
        }
        if(key === 2) {
            return (
                <div className={style.App}>
                    <RegisterDefendee web3={drizzle.web3}/>
                </div>
            );
        }
        if(key === 3) {
            return (
                <MyCardColumn drizzleState={drizzleState}/>
            );
        }
    }

    if(!copyrighter){
        return (
            <div className={style.App}>
                <RegisterCopyrighter setRegistered={setRegistered} drizzle={drizzle} drizzleState={drizzleState} />
            </div>
        );
    }

    else{
        return (
            <div className={style.App}>
                <Navbar className={style.naviReport} bg="light" variant="light">
                    {/*<Navbar.Brand>Copyrighter</Navbar.Brand>*/}
                    <Nav className="mr-auto">
                        <Nav.Link className={key === 1 ? 'active' : ''} onClick={()=>setKey(1)}>NewReport</Nav.Link>
                        <Nav.Link className={key === 2 ? 'active' : ''} onClick={()=>setKey(2)}>Register</Nav.Link>
                        <Nav.Link className={key === 3 ? 'active' : ''} onClick={()=>setKey(3)}>Modify</Nav.Link>
                    </Nav>
                    <Token drizzle={drizzle} drizzleState={drizzleState}/>
                </Navbar>
                <Content />

            </div>
        );
    }
};
