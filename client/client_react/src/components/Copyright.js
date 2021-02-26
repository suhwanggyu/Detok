import React, {useState, useEffect} from "react";
import RegisterDefendee from './defendee/RegisterDefendee';
import RegisterCopyrighter from 'components/copyrighter/RegisterCopyrighter';
import JudgeTarget from 'components/copyrighter/JudgeTarget';
import style from 'css/RegisterDefendee.module.css';
import {Navbar, Nav} from 'react-bootstrap';
import Token from 'components/account/Token';

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
                <div></div>
            );
        }
    }

    if(!copyrighter){
        return (
            <div className={style.App}>
                테스트 과정에서는 보상을 줄 수 있는 사람이 개발자 밖에 없기 때문에<br />
                등록창을 열어두지 않습니다. 체험해보고 싶은 사람은 <br />
                wang1@hanyang.ac.kr 로 메일 주시면 따로 열어서 보여드리겠습니다.<br />
                In test, because only developer has reward,<br />
                Prototype don't open register menu.
                {/*<RegisterCopyrighter setRegistered={setRegistered} drizzle={drizzle} drizzleState={drizzleState} />*/}
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
