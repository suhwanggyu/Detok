import React, {useState, useEffect} from "react";
import { CardColumns, InputGroup, FormControl} from 'react-bootstrap';
import Item from 'components/sale/Item';


export default ({ drizzle, drizzleState }) => {
    let [keyword, setKeyword] = useState("");
    let [result, setResult] = useState([{itemId:null, sellerAddress:null, sellerName:null, detailed: null, tokenamount: null, logo:null}]);
    
    useEffect(()=>{
        takeSaleitems();
    },[keyword]);

    function handleKeyword(e){
        setKeyword(e.target.value);
    }

    function takeSaleitems(){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function(e) {
            if(xhr.readyState !== XMLHttpRequest.DONE)    return;
            if(xhr.status === 200){
                let parsed = JSON.parse(xhr.response);
                setResult(parsed.result);
            } else {
                console.log('Error!');
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/sale/list');
        xhr.setRequestHeader('Content-type','application/json');
        xhr.send(JSON.stringify({'name': keyword}));
    }

    function RenderCard(){
        const resultList = result.map((temp, index) =>
            <Item key={index} props={temp} drizzle={drizzle} drizzleState={drizzleState}/>
        );
        return(
            <CardColumns>{resultList}</CardColumns>
        );
    }
    return (
        <div>
            <InputGroup style={{'marginBottom':'1rem'}}>
                {/*<InputGroup.Prepend>
                    <InputGroup.Text>Defendee 검색</InputGroup.Text>
                </InputGroup.Prepend>*/}
                <FormControl
                placeholder="Copyright search"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={handleKeyword}
                />
            </InputGroup>
            
            <RenderCard />
        </div>
    );
};
