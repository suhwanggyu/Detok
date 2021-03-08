import React from "react";
import { InputGroup, FormControl, Form} from 'react-bootstrap';



export default ({selectDomain,selectKeyword}) => {
  
    function handleChange(e){
      console.log(e.target.files[0]);
      selectDomain(e.target.files[0]);
    }
  
    function hadleChangeKeyword(e){
      selectKeyword(e.target.value);
    }
  
    return(
      <InputGroup size="sm">
        <div style={{width:'100%', marginTop:'1rem', marginBottom:'1rem'}}>
            <FormControl
                type="text"
                placeholder="Detailed"
                onChange={hadleChangeKeyword}
                aria-label="Detailed"
                aria-describedby="basic-addon1"
            />
        </div>
    
        <div style={{width:'100%', marginBottom:'1rem'}}>
          <Form.File
              className="position-relative"
              required
              name="file"
              label="File"
              onChange={handleChange}
              id="validationFormik107"
              feedbackTooltip
            />
        </div>  
      </InputGroup>
    );
  };
  