import React, {useState, useEffect, useCallback} from 'react';
import {Button, Modal, Card, OverlayTrigger,Tooltip, Badge} from 'react-bootstrap';
import style from 'css/Inspect.module.css';
import InspectBtn from './InspectBtn';

export default({ drizzle, drizzleState }) => {
    let [target, setTarget] = useState([{domain:null,defendeeName:null, imgdist:null,rewardAmount:null,detailed:null}]);
    let [inspect, setInspect] = useState(true);
    const [show, setShow] = useState(false);
    const randBadge = ["primary", "secondary", "success","danger","warning","light","dark"];
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const takeTarget = useCallback( () => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function (e) {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200) {
                let parsed = JSON.parse(xhr.response).result;
                setTarget(parsed);
            } else {
                setTarget(undefined);
                console.log('No Inspect target');
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/inspect/inspectTarget');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify({'myAddress':drizzleState.accounts[0]}));
    },[inspect]);

    useEffect(()=>{
        if(inspect){
            takeTarget();
            setInspect(false);
        }
    },[inspect, takeTarget]);


    
    function RenderTarget(){
        if(target){

            return(
                <div style={{'margin':'1rem','paddingTop':'3rem', 'textAlign':'center'}}>
                    <Card style={{ 'width': '26rem', 'display': 'inline-block'}}>
                        <Card.Img variant="top" src={target[0].imgdist} />
                        <Card.Body>
                        <Card.Title className={style.cardTitle}><h3>{target[0].defendeeName}</h3></Card.Title>
                        <Badge pill variant={randBadge[target[0].logo]}>{target[0].copyrighterName}</Badge><br/>
                        <div className={style.domaininfo}>
                                <OverlayTrigger
                                    key={'top'}
                                    placement={'top'}
                                    overlay={
                                        <Tooltip id={`tooltip-${'top'}`}>
                                            {target[0].domain}
                                        </Tooltip>
                                    }
                                >
                                    <a href={target[0].domain} target="_blank" rel="noopener noreferrer">Link</a>
                                </OverlayTrigger>
                        </div>
                        <Card.Text>
                            {target[0].detailed}<br/>
                            {target[0].rewardAmount/2 + " DFD"}
                        </Card.Text>
                        <InspectBtn target={target} handleShow={handleShow} drizzle={drizzle} drizzleState={drizzleState}/>
                    </Card.Body>
                    </Card>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        animation={false}
                    >
                        <Modal.Header closeButton>
                        <Modal.Title>Inspect</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            You check about {target[0].defendeeName}<br />
                            <a href={target[0].domain} target="_blank" rel="noopener noreferrer">Link</a><br />
                            Please do process in metamask
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={(e)=>{handleClose();setInspect(true);}}>
                            Exit : please METAMASK -{'>'}
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }
        return(
            <div className={style.warningnothing}>
                <h1>Nothing can inspect</h1>
            </div>
        );
    }

    return(
        <div>
            {/*}
            <div className={style.title}>
                <h1>Inspect</h1>
            </div> */}
            <RenderTarget/>
        </div>
    );
}