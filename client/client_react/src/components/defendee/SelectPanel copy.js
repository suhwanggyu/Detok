import React, {useState, useEffect} from "react";
import {InputGroup, FormControl, ListGroup} from 'react-bootstrap';
import "../../App.css";
export default ({selectTarget}) => {
    let [search, setSearch] = useState("");
    let [result, setResult] = useState([]);
    let [selectedName, setName] = useState("");
    let [imgDist, setImg] = useState("");
    useEffect(()=>{
        takeDefendee();
    },[search]);


    useEffect(()=>{
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = (e) => {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200) {
                console.log(JSON.parse(xhr.response).dist);
                setImg(JSON.parse(xhr.response).dist);
            } else {
                console.log("error!");
            }
        }
        xhr.open('post',process.env.REACT_APP_API + '/defendee/selectPicture');
        xhr.setRequestHeader('Content-type','application/json');
        xhr.send(JSON.stringify({'searchName':selectedName}));

    },[selectedName]);

    function handleDefenee(e){
        setSearch(e.target.value);
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
        xhr.open('POST',process.env.REACT_APP_API + '/defendee/search');
        xhr.setRequestHeader('Content-type','application/json');
        xhr.send(JSON.stringify({'searchName':search}));
    }

    function handleClick(e){
        setName(e.target.value);
        selectTarget(e.target.value);
    }

    function ImgForSelected(){
        if(imgDist =='') return '';
        else{
            return(
                <img src={imgDist} style={{'width':'30rem', height:'40rem'}}/>
            );
        }
    }

    function Listfunc(){
        const resultList = result.map((temp) => 
            <ListGroup.Item action onClick={handleClick} value={temp.name} active={temp.name === selectedName? true:false}>{temp.name}</ListGroup.Item>
        );
        return (
            <ListGroup>{resultList}</ListGroup>
        );
    }

    return (
        <div>
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text>Defendee 검색</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                placeholder="Defendee Name"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={handleDefenee}
                />
            </InputGroup>
            <div>
                <Listfunc />
            </div>
            <div>
                <ImgForSelected />    
            </div>
        </div>
    );
}