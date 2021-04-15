import React from "react";
import {Card, OverlayTrigger, Tooltip, Button, Badge} from 'react-bootstrap';
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
                        <OverlayTrigger
                            key={'right'}
                            placement={'right'}
                            overlay={
                                <Tooltip id={`tooltip-${'right'}`}>
                                    {props.domain}
                                </Tooltip>
                            }
                        >
                            <Button variant="light">
                            Domain <Badge variant={randBadge[props.step]}>{props.step}</Badge>
                            <span className="sr-only">unread messages</span>
                            </Button>
                        </OverlayTrigger><br/>
                        {"Reward : " + props.rewardAmount + " DTK"}<br/>
                        Step : <Badge pill variant={randBadge[props.step]}>{procedure[props.step]}</Badge>
                    </Card.Text>
                    </Card.Body>
        </Card>
    );
}