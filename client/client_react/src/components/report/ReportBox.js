import React, {useState} from "react";
import {Button, Modal} from 'react-bootstrap';
import Reportation from '../report/Reportation';
import "css/selectPanel.css";

export default ({target, drizzleState}) => {

    const [show, setShow] = useState(false);
    const [domain, setDomain] = useState("");
    const [keyword, setKeyword] = useState("")
    const handleClose = () =>{
         setShow(false);
    }

    const handleCloseWithReport = () =>{
        /* TODO : IP 처리 만들기 */
        sendReport(domain, target.name, "0.0.0.0");
        setShow(false);
    }

    const handleShow = () =>{
         setShow(true);
    }

    function selectDomain(_domain){
        setDomain(_domain);
    }

    function selectKeyword(_keyword){
        setDomain(_keyword);
    }

    function sendReport(_domain, _defendeeName, _ip){
        let web3 = drizzleState.web3;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function (e) {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200) {
                let parsed = JSON.parse(xhr.response);
                let abi = parsed.abi;
                let contract = new web3.eth.Contract(abi, parsed.networks[5777].address);
                let argDomain = await web3.utils.fromUtf8(_domain);
                let argName = await web3.utils.fromUtf8(_defendeeName);
                let argIP = await web3.utils.fromUtf8(_ip);
                await contract.methods.notifyHandler(argDomain, argName, argIP).send( {from:drizzleState.accounts[0], gas: 300000});
            } else {
                console.log('Error!');
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/contractjson');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify({'type':'Notify'}));
    }



    if(target !== undefined){
        return (
            <div>
                <Button variant="outline-secondary" onClick={handleShow} className="ReportBtn">
                    Report
                </Button>

                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Report</Modal.Title>
                </Modal.Header>
                <Modal.Body>   
                    <Reportation selectDomain={selectDomain} selectKeyword={selectKeyword} drizzleState={drizzleState}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseWithReport}>
                        Report
                    </Button>
                </Modal.Footer>
                </Modal>
            </div>
        );
    } else {
        return(
            <div></div>
        );
    }
}