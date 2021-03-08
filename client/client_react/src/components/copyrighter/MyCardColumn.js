import React, {useState, useEffect} from "react";
import {CardColumns, FormControl, Navbar, Nav, Form} from 'react-bootstrap';
import DefendeeItem from 'components/copyrighter/DefendeeItem';


export default React.memo(({drizzleState}) => {
    let [result, setResult] = useState([{itemId:null, sellerAddress:null, sellerName:null, detailed: null, tokenamount: null, logo:null}]);
    useEffect(() => {
        takeDefendee();
    }, []);
    console.log("aa");
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
        xhr.open('POST',process.env.REACT_APP_API + '/defendee/search/address')
        xhr.setRequestHeader('Content-type','application/json');
        xhr.send(JSON.stringify({'searchName': drizzleState.accounts[0]}));
    }
        
    function RenderCard(){
        const resultList = result.map((temp, index) =>
            <DefendeeItem key={index} props={temp} drizzleState={drizzleState}/>
        );
        return(
            <CardColumns>{resultList}</CardColumns>
        );
    }

    return (
        <div>
            <RenderCard />
        </div>
    );
}, (prev, next) => {console.log(prev, next); return prev.accounts[0] == next.accounts[0]});
