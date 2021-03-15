import React, {useState, useEffect} from "react";
import {CardColumns, FormControl, Navbar, Nav, Form} from 'react-bootstrap';
import DefendeeItem from 'components/reportvtwo/DefendeeItem';
import style from "css/report.module.css";


export default ({ drizzle, drizzleState }) => {
    let [keyword, setKeyword] = useState("");
    let [result, setResult] = useState([{itemId:null, sellerAddress:null, sellerName:null, detailed: null, tokenamount: null, logo:null}]);
    const [key, setKey] = useState(1);
    useEffect(()=>{
        takeDefendee();
    },[keyword, key]);

    function handleKeyword(e){
        setKeyword(e.target.value);
    }

    function takeDefendee(){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = (e) => {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200) {
                setResult(JSON.parse(xhr.response).result);
            } else {
                console.log("error!");
            }
        }
        if(key===1)
            xhr.open('POST',process.env.REACT_APP_API + '/defendee/search');
        if(key===2)
            xhr.open('POST',process.env.REACT_APP_API + '/defendee/search');
        if(key===3)
            xhr.open('POST',process.env.REACT_APP_API + '/defendee/searchOrdered');
        xhr.setRequestHeader('Content-type','application/json');
        xhr.send(JSON.stringify({'searchName':keyword}));
    }

    
    function RenderCard(){
        if(key === 1){
            const resultList = result.map((temp, index) =>
                <DefendeeItem key={index} props={temp} drizzle={drizzle} drizzleState={drizzleState}/>
            );
            return(
                <CardColumns>{resultList}</CardColumns>
            );
        }
        if(key === 2){
            return (
                <div>This is not offering in prototype</div>
            );
            /*
            const resultList = result.map((temp) =>
                <DefendeeItem props={temp} drizzle={drizzle} drizzleState={drizzleState}/>
            );
            return(
                <CardColumns>{resultList}</CardColumns>
            );*/
        }
        if(key === 3){
            const resultList = result.map((temp, index) =>
                <DefendeeItem key={index} props={temp} drizzle={drizzle} drizzleState={drizzleState}/>
            );
            return(
                <CardColumns>{resultList}</CardColumns>
            );
        }
    }
    return (
        <div>
            <Navbar className={style.naviReport} bg="light" variant="light">
                    <Nav className="mr-auto">
                        <Nav.Link className={key === 1 ? 'active' : ''} onClick={()=>setKey(1)}>ALL</Nav.Link>
                        <Nav.Link className={key === 3 ? 'active' : ''} onClick={()=>setKey(3)}>Hot</Nav.Link>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" onChange={handleKeyword} className="mr-xl-2" />
                    </Form>
            </Navbar>
            <RenderCard />
        </div>
    );
};
