import React, {useState, useEffect} from "react";
import {InputGroup, FormControl, Carousel} from 'react-bootstrap';
import ReportBox from '../report/ReportBox';
import "../../css/selectPanel.css";
export default ({selectTarget, drizzle, drizzleState}) => {
    let [search, setSearch] = useState("");
    let [result, setResult] = useState([{name:"",imgdist:""}]);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    function handleDefenee(e){
        setSearch(e.target.value);
    };

    useEffect(()=>{
        setIndex(0);
        takeDefendee();
    },[search]);


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

    function Listfunc(){
        const resultList = result.map((temp, index) => 
            <Carousel.Item key={index}>
                <img
                    className="d-block w-100"
                    src={temp.imgdist}
                    alt="First slide"
                    style={{height:'40rem'}}
                    value={temp.name}    
                />
                <Carousel.Caption>
                <h3>{temp.name}</h3>
                </Carousel.Caption>
            </Carousel.Item>
        );
        return (
            <Carousel fade={true} activeIndex={index} interval={null} onSelect={handleSelect}>{resultList}</Carousel>
        );
    }

    return (
        <div style={{'margin':'1rem', 'textAlign':'center'}}>
            <div className="title">
                <h1>
                    Reportation
                </h1>
            </div>
            <div className="reportSearchContainer">
                <InputGroup style={{'marginBottom':'1rem'}}>
                    {/*<InputGroup.Prepend>
                        <InputGroup.Text>Defendee 검색</InputGroup.Text>
                    </InputGroup.Prepend>*/}
                    <FormControl
                    placeholder="Copyright search"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={handleDefenee}
                    />
                </InputGroup>
            </div>
            <div>
                <Listfunc />
            </div>
            <ReportBox target={result[index]} drizzle={drizzle} drizzleState={drizzleState}/>
        </div>
    );
}