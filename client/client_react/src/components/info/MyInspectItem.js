import React, {useState, useEffect} from "react";
import {Card, CardColumns, InputGroup, FormControl, Button, Modal, Badge} from 'react-bootstrap';
import style from "css/sale.module.css";


export default ({props, drizzle, drizzleState }) => {
    const randBadge = ["danger", "dark", "primary","success","warning","light","dark"];
    const procedure = ["0 - Deny", "1 - Inspecting","2 - Judging","3 - Approve"];
    return(
        <Card>
                    <Card.Img variant="top" src={props.imgdist} />
                    <Card.Body>
                    <Card.Title className={style.cardTitle}>{props.name}</Card.Title>
                    
                    <Card.Text style={{'textAlign':'left','paddingLeft':'1rem'}}>
                        {"domain : " + props.domain}<br/>
                        {"Reward : " + props.rewardAmount + " DTK"}<br/>
                        Step : <Badge pill variant={randBadge[props.step]}>{procedure[props.step]}</Badge>
                    </Card.Text>
                    </Card.Body>
        </Card>
    );
}