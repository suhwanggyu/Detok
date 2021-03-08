import React, {useState, useEffect} from "react";
import {Card, Button, Modal, Badge} from 'react-bootstrap';
import style from "css/sale.module.css";
import Input from 'components/copyrighter/Input';
import axios from 'axios';

export default ({props}) => {
    const url = require('url');
    const [clicked, setClicked] = useState(false);
    const [show, setShow] = useState(false);
    const [domain, setDomain] = useState("");
    const handleClicked = () => {setClicked(true);}
    const randBadge = ["primary", "secondary", "success","danger","warning","light","dark"];
    const [keyword, setKeyword] = useState("");
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
       sendReq();
       sendImg();
       setShow(false);
    }

    function selectKeyword(_keyword){
        setKeyword(_keyword);
    }

    function sendReq(){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function (e) {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200) {
                console.log("success");
            } else {
                console.log('Error!');
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/defendee/address');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify({'detailed':keyword, 'name':props.name}));
    }

    const sendImg = async () => {
        const formData = new FormData();
        formData.append('file', domain);
        formData.append('name', props.name);
        await axios.post(process.env.REACT_APP_API + "/defendee/img", formData).then(res => {
            alert('성공');
        }).catch(err => {
            alert('실패');
        })
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
                    <Button className={style.buyBtn} variant="outline-danger" onClick={(e)=>{handleClicked(); handleShow()}}>Report</Button>
                    </Card.Body>

                    <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Change the metadata</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>   
                        <Input selectDomain={selectDomain} selectKeyword={selectKeyword}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleCloseWithReport}>
                            Change
                        </Button>
                    </Modal.Footer>
                    </Modal>
        </Card>
    );
}
