import React from "react";
import { InputGroup, FormControl} from 'react-bootstrap';



export default ({selectUserId}) => {
  // destructure drizzle and drizzleState from props

    function hadleChange(e){
    selectUserId(e.target.value);
    }

    return(
        <InputGroup  size="sm">
            <FormControl
                type="text"
                placeholder="Your ID"
                onChange={hadleChange}
                aria-label="Username"
                aria-describedby="basic-addon1"
            />
        </InputGroup>
    );
};
