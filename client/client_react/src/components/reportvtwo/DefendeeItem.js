import React, {useState, useEffect} from "react";
import {Card, Button, Modal, Badge} from 'react-bootstrap';
import style from "css/sale.module.css";
import InputReport from 'components/reportvtwo/InputReport';


export default ({props, drizzle, drizzleState }) => {
    const url = require('url');
    const [clicked, setClicked] = useState(false);
    const [show, setShow] = useState(false);
    const [domain, setDomain] = useState("");
    const [ip, setIP] = useState("0.0.0.0");
    const handleClicked = () => {setClicked(true);}
    const randBadge = ["primary", "secondary", "success","danger","warning","light","dark"];
    const [keyword, setKeyword] = useState("")
    useEffect(()=>{
        if(ip !== "0.0.0.0"){
            sendReport();
        }
    },[ip]);
    
    const handleClose = () =>{
        setShow(false);
    }

    const handleShow = () =>{
        setShow(true);
        
    }

    function selectDomain(_domain){
        setDomain(_domain);
    }

   const handleCloseWithReport = async () => {
       /* TODO : IP 처리 만들기 */
       beforeSendReport();
       setShow(false);
    }

    function selectKeyword(_keyword){
        setKeyword(_keyword);
    }
    function sendReport(){
        let web3 = drizzle.web3;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function (e) {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200) {
                let parsed = JSON.parse(xhr.response);
                let abi = parsed.abi;
                let contract = new web3.eth.Contract(abi, parsed.networks[process.env.REACT_APP_ID].address);
                let argDomain = await web3.utils.fromUtf8(url.parse(domain).href);
                let argName = await web3.utils.fromUtf8(props.name);
                let argIP = await web3.utils.fromUtf8(ip);
                console.log(argDomain);
                await contract.methods.notifyHandler(argDomain, argName, argIP).send( {from:drizzleState.accounts[0], gas: 500000});
            } else {
                console.log('Error!');
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/contractjson');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify({'type':'Notify'}));
    }

    
    function beforeSendReport(){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function (e) {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200) {
                let _ip = JSON.parse(xhr.response).ip;
                if(_ip === null){
                    alert("It is an impossible domain");
                }
                else{  
                    setIP(_ip);
                }
            } else {
                alert("It is an impossible domain");
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/judge/ip');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify({'domain':domain, 'keyword':keyword, 'name':props.name}));
    }

    return(
        <Card>
                    <Card.Img variant="top" src={props.imgdist} />
                    <Card.Body>
                    <Card.Title className={style.cardTitle}>{props.name}</Card.Title>
                    <Card.Text className={style.cardText}>
                        <Badge pill variant={randBadge[props.logo]}>{props.copyrighterName}</Badge><br/>
                        {props.detailed}<br/>
                        {props.rewardAmount/2 + " DFD"}
                    </Card.Text>
                    <Button className={style.buyBtn} variant="outline-danger" onClick={(e)=>{handleClicked();handleShow()}}>Report</Button>
                    </Card.Body>

                    <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Report Illegal Link</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>   
                        <InputReport selectDomain={selectDomain} selectKeyword={selectKeyword}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleCloseWithReport}>
                            Report
                        </Button>
                    </Modal.Footer>
                    </Modal>
        </Card>
    );
}