import React from "react";
import { InputGroup, FormControl} from 'react-bootstrap';



export default ({selectDomain,selectKeyword, drizzleState}) => {
  // destructure drizzle and drizzleState from props

  function hadleChange(e){
    selectDomain(e.target.value);
  }

  function hadleChangeKeyword(e){
    selectKeyword(e.target.value);
  }

  return(
    <InputGroup  size="sm">
                    <FormControl
                        type="text"
                        placeholder="Illegal Link"
                        onChange={hadleChange}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                    <FormControl
                        type="text"
                        placeholder="keyword"
                        onChange={hadleChangeKeyword}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
    </InputGroup>
  );
};
