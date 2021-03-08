import React, { useState } from "react";
//import logo from "./logo.png";
import Inspector from "./components/Inspector";
import Reporter from "./components/Reporter";
import Copyrighter from "components/Copyrighter";
import Sale from "components/Sale";
import Info from 'components/Info';
import 'css/tab.css';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
export default ({ drizzle, drizzleState }) => {
  const [key, setKey] = useState('report');
  const ActiveStyle = {
    color:"black",
    background:"transparent"
  };

  const InfoWrapper = () =>{
    if(key === "info"){
      return(
        <Tab.Pane eventKey="info">
          <Info drizzle={drizzle} drizzleState={drizzleState}/>
        </Tab.Pane>
        );
    } else {
      return(<div></div>);
    }
  }

  return (
    <div style={{'margin':'1rem'}}>
      {/*<Header drizzle={drizzle} drizzleState={drizzleState}/>*/}
      <Tab.Container id="left-tabs-example" defaultActiveKey="report" onSelect={key => setKey(key)}>
        <Row>
          <Col className="tabmenu" style={{'boxShadow': "0.5rem 1rem 1rem #E2E2E2"}} sm={2}>
            <h1 className="name">DeTok</h1>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link style={ key === 'info' ? ActiveStyle:{'color':'#A9A9A9'}} eventKey="info">MyInfo</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link style={ key === 'sale' ? ActiveStyle:{'color':'	#A9A9A9'}} eventKey="sale">Sale</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link style={ key === 'report' ? ActiveStyle:{'color':'	#A9A9A9'}} eventKey="report">Report</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link style={ key === 'inspect' ? ActiveStyle:{'color':'#A9A9A9'}} eventKey="inspect">Inspect</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link style={ key === 'judge' ? ActiveStyle:{'color':'#A9A9A9'}} eventKey="judge">Copyrighter</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content className="content">
              <InfoWrapper />
              <Tab.Pane eventKey="sale">
                <Sale drizzle={drizzle} drizzleState={drizzleState}/>
              </Tab.Pane>
              <Tab.Pane eventKey="report">
                <Reporter drizzle={drizzle} drizzleState={drizzleState}/>
              </Tab.Pane>
              <Tab.Pane eventKey="inspect">
                <Inspector drizzle={drizzle} drizzleState={drizzleState}/>
              </Tab.Pane>
              <Tab.Pane eventKey="judge">
                <Copyrighter drizzle={drizzle} drizzleState={drizzleState}/>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};
