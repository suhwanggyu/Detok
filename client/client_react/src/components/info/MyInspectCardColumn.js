import React, {useState, useEffect} from "react";
import {CardColumns} from 'react-bootstrap';
import MyItem from 'components/info/MyItem';


export default ({ drizzle, drizzleState }) => {
    const [result, setResult] = useState([]);

    useEffect(()=>{
        takeMyReport();
    },[]);
    
    function takeMyReport(){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = (e) => {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200) {
                setResult(JSON.parse(xhr.response).result);
            } else {
                console.log("error!");
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/info/searchInspect');
        xhr.setRequestHeader('Content-type','application/json');
        xhr.send(JSON.stringify({'myAddress':drizzleState.accounts[0]}));
    }

    
    function RenderCard(){
        if(result.length !== 0){
            const resultList = result.map((temp) =>
                <MyItem props={temp} drizzle={drizzle} drizzleState={drizzleState}/>
            );
            return(
                <CardColumns>{resultList}</CardColumns>
            );
        } else {
            return (<div>nothing</div>);
        }
    }
    return (
        <div>
            <RenderCard />
        </div>
    );
};
