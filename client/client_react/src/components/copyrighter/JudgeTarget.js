import React, {useState, useEffect, useCallback} from 'react';
import {Button, InputGroup, FormControl} from 'react-bootstrap';
import style from 'css/RegisterDefendee.module.css';
import JudgeElement from 'components/copyrighter/JudgeElement';
export default({ drizzle, drizzleState }) => {
    const web3 = drizzle.web3;
    const [target, setTarget] = useState();
    const [inspect, setInspect] = useState(true);
    const [value, setValue] = useState(0);
    
    function hadleChange(e){
        setValue(e.target.value);
    }

    const takeTarget = useCallback( () => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function (e) {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200) {
                let parsed = JSON.parse(xhr.response).result;
                if(parsed){
                    let parsedName = JSON.parse(xhr.response).defendee;
                    let temp = [];
                    console.log(parsedName);
                    parsedName.forEach(element => {
                        temp.push(parsed.filter(el => {
                            return element.name === el.name;
                        }));
                    });
                    setTarget(temp);
                } else {
                    setTarget(undefined);
                }
            } else {
                setTarget(undefined);
                console.log('No target');
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/judge/judgeTarget');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify({'myAddress':drizzleState.accounts[0]}));
    },[]);

    useEffect(()=>{
        if(inspect){
            takeTarget();
            console.log(inspect);
            setInspect(false);
        }
    },[takeTarget]);

    const approve = () => {
        
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function (e) {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200) {
                let parsed = JSON.parse(xhr.response);
                let address = parsed.networks[process.env.REACT_APP_ID].address;
                let xhr2 = new XMLHttpRequest();
                xhr2.onreadystatechange = async function (e) {
                    if(xhr2.readyState !== XMLHttpRequest.DONE) return;
                    if(xhr2.status === 200) {
                        let parsed2 = JSON.parse(xhr2.response);
                        let abi = parsed2.abi;
                        let contract = new web3.eth.Contract(abi, parsed2.networks[process.env.REACT_APP_ID].address);
                        let amount = await web3.utils.toWei(value,"ether")
                        await contract.methods.approve(address, amount).send( {from:drizzleState.accounts[0], gas: 300000});
                    } else {
                        console.log('Error!');
                    }
                }
                xhr2.open('POST',process.env.REACT_APP_API + '/contractjson');
                xhr2.setRequestHeader('Content-type', 'application/json');
                xhr2.send(JSON.stringify({'type':'DetokToken'}));
            } else {
                console.log('Error!');
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/contractjson');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify({'type':'DefendeeData'}));
    }
 
    function FindReport(){
        const reportList = target.map((element,index) =>{
            if(element.length !== 0) {
                return(
                    <JudgeElement key={index} props={element} drizzle={drizzle} drizzleState={drizzleState}/>
                );
            }
        });
        return (
            <div>{reportList}</div>
        );
    }

    function RenderTarget(){
        if(target){        
            return(
                <div style={{'paddingTop':'3rem', 'textAlign':'center'}}>
                    <FindReport />
                </div>
            );
        }

        return(
            <div className={style.warningnothing}>
                <h1>you don't have any new report</h1>
            </div>
        );
    }

    return(
        <div>
            <InputGroup style={{'marginTop':'2rem','width':'20rem'}}>
                <FormControl
                    type="text"
                    placeholder="Amount"
                    onChange={hadleChange}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                />
                <Button variant="outline-secondary" style={{'marginLeft':'1rem'}} onClick={()=>{approve();}}>Approve</Button>
            </InputGroup>
            <RenderTarget/>
        </div>
    );
}