import React, {useState} from "react";
import {Card, Button, Modal} from 'react-bootstrap';
import style from "css/sale.module.css";
import BuyItem from 'components/sale/BuyItem';

export default ({props, drizzle, drizzleState }) => {
    const [show, setShow] = useState(false);
    const [userId, setUserId] = useState("");
    const handleClose = () =>{
        setShow(false);
    }

    const handleShow = () =>{
        setShow(true);
    }
    function selectUserId(_userId){
        setUserId(_userId);
    }
   const handleCloseWithBuy = () =>{
       /* TODO : IP 처리 만들기 */
       sendBuy();
       setShow(false);
    }

    function sendBuy(){
        let web3 = drizzle.web3;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function (e) {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200) {
                let parsed = JSON.parse(xhr.response);
                let abi = parsed.abi;
                let contract = new web3.eth.Contract(abi, parsed.networks[5777].address);
                console.log(typeof props.tokenamount.toString());
                let amount = await web3.utils.toWei(props.tokenamount.toString(),"ether");
                await contract.methods.approve(props.sellerAddress, amount).send({from:drizzleState.accounts[0], gas: 100000});
                sendBuyToServer();
            } else {
                console.log('Error!');
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/contractjson');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify({'type':'DefenderToken'}));
    }
    
    /* TODO : implement buy */
    function sendBuyToServer(){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function(e) {
            if(xhr.readyState !== XMLHttpRequest.DONE)    return;
            if(xhr.status === 200){
            } else {
                console.log('Error!');
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/sale/buy');
        xhr.setRequestHeader('Content-type','application/json');
        xhr.send(JSON.stringify({'orderAddress': props.sellerAddress, 'itemId': props.itemId, 'userId':userId}));
    }

    /* TODO : implement cancel */
    function sendCancelToServer(){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function(e) {
            if(xhr.readyState !== XMLHttpRequest.DONE)    return;
            if(xhr.status === 200){

            } else {
                console.log('Error!');
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/sale/buy');
        xhr.setRequestHeader('Content-type','application/json');
        xhr.send(JSON.stringify({'orderAddress': props.sellerAddress, 'itemId': props.itemId, 'userId':userId}));
    }

    return(
        <Card>
                    <Card.Img variant="top" src={props.logo} />
                    <Card.Body>
                    <Card.Title className={style.cardTitle}>{props.sellerName}</Card.Title>
                    <Card.Text>
                        {props.detailed}<br/>
                        {props.tokenamount + " DFD"}
                    </Card.Text>
                    <Button className={style.buyBtn} variant="primary" onClick={(e)=>{handleShow();}}>Buy</Button>
                    </Card.Body>

                    <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Buy Service</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>   
                        <BuyItem selectUserId={selectUserId}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleCloseWithBuy}>
                            Buy
                        </Button>
                    </Modal.Footer>
                    </Modal>
        </Card>
    );
}