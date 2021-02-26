import React from "react";
import {Card, OverlayTrigger, Tooltip} from 'react-bootstrap';
import style from 'css/RegisterDefendee.module.css';
import JudgeBtn from 'components/copyrighter/JudgeBtn';
export default ({ props, drizzle, drizzleState }) => {
    
    const RenderReport = () => {
        const reportList = props.map((element, index) => 
            <div key={index}>
                <OverlayTrigger
                    key={'left'}
                    placement={'left'}
                    overlay={
                        <Tooltip id={`tooltip-${'left'}`}>
                            {element.domain}
                        </Tooltip>
                    }
                >
                    <a href={element.domain} target="_blank" rel="noopener noreferrer">Link</a>
                </OverlayTrigger>
                
                <JudgeBtn target={element} drizzle={drizzle} drizzleState={drizzleState} />
            </div>
        );
        return( 
            <div style={{'textAlign':'left','margin':'1rem','display':'box'}}>
                {reportList}
            </div>
        );
    }
    return (
        <div style={{'paddingTop':'1rem', 'textAlign':'center', 'display':'flex'}}>
                <Card style={{ 'width': '16rem'}}>
                    <Card.Body>
                    <Card.Title className={style.cardTitle}>{props[0].name}</Card.Title>
                    <Card.Img variant="top" src={props[0].imgdist} />
                    </Card.Body>
                </Card>
                <RenderReport />
        </div>
    );
};





