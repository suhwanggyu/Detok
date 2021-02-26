import React, {useState} from "react";
import style from 'css/Info.module.css';
import {Navbar, Nav} from 'react-bootstrap';
import MyReportCardColumn from 'components/info/MyReportCardColumn';
import MyInspectCardColumn from 'components/info/MyInspectCardColumn';
import Token from 'components/account/Token';

/**
 * @dev It will be change, because it render by drizzle.
 * It cause key initialize when detect drizzle changed.
 */
export default ({ drizzle, drizzleState }) => {
    const [key, setKey] = useState(1);
    const Content = () => {
        if(key === 1) {
            return (
                <MyReportCardColumn drizzle={drizzle} drizzleState={drizzleState}/>
            );
        }
        if(key === 2) {
            return (
                <MyInspectCardColumn drizzle={drizzle} drizzleState={drizzleState}/>
            );
        }
    }


    return (
        <div className={style.App}>
            <Navbar className={style.naviReport} bg="light" variant="light">
                {/*<Navbar.Brand>Copyrighter</Navbar.Brand>*/}
                <Nav className="mr-auto">
                    
                    <Nav.Link className={key === 1 ? 'active' : ''} onClick={()=>setKey(1)}>My Report</Nav.Link>
                    <Nav.Link className={key === 2 ? 'active' : ''} onClick={()=>setKey(2)}>My Inspect</Nav.Link>
                </Nav>
                <Token drizzle={drizzle} drizzleState={drizzleState}/>
            </Navbar>
            <Content />
        </div>
    );
};
