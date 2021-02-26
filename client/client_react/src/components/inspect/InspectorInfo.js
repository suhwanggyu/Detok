import React, {useState, useEffect} from "react";
import {Card} from 'react-bootstrap';

export default ({ drizzleState }) => {
    const [rate, setRate] = useState(0);

    useEffect(() => {
        TakeInfo();
    }, []);

    function TakeInfo(){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function (e) {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200) {
                let parsed = JSON.parse(xhr.response).rate;
                setRate(parsed);
            } else {
                console.log("No inspector");
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/inspect/inspectorInfo');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify({'myAddress':drizzleState.accounts[0]}));
    }

    return (
        <div>
            <Card>
                <Card.Header>
                    USERINFO
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {rate}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};
