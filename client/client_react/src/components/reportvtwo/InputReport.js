import React from "react";
import { InputGroup, FormControl} from 'react-bootstrap';



export default ({selectDomain,selectKeyword}) => {
  
    function hadleChange(e){
      selectDomain(e.target.value);
    }
  
    function hadleChangeKeyword(e){
      selectKeyword(e.target.value);
    }
  
    return(
      <InputGroup size="sm">
        <div style={{width:'100%', marginTop:'1rem', marginBottom:'1rem'}}>
            <FormControl
                type="text"
                placeholder="keyword"
                onChange={hadleChangeKeyword}
                aria-label="Username"
                aria-describedby="basic-addon1"
            />
        </div>
    
        <div style={{width:'100%', marginBottom:'1rem'}}>
            <FormControl
                type="text"
                placeholder="URL"
                onChange={hadleChange}
                aria-label="Username"
                aria-describedby="basic-addon1"
            />
        </div>  
      </InputGroup>
    );
  };
  