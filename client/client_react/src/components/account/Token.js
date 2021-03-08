import React, {useState, useEffect} from "react";


export default ({drizzle, drizzleState}) => {
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        getBalance();
    }, [drizzle]);    
    const getBalance = () => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function (e) {
            if(xhr.readyState !== XMLHttpRequest.DONE)  return;
            if(xhr.status === 200){
                let parsed = JSON.parse(xhr.response);
                let abi = parsed.abi;
                let contract = new drizzle.web3.eth.Contract(abi, parsed.networks[process.env.REACT_APP_ID].address);
                let money = await contract.methods.balanceOf(drizzleState.accounts[0]).call();
                money = await drizzle.web3.utils.fromWei(money, "ether");
                setBalance(parseInt(money));
            } else {
                console.log("ERROR : TOKEN INFORMATION");
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/contractjson');
        xhr.setRequestHeader('Content-type','application/json');
        xhr.send(JSON.stringify({'type':'DetokToken'}));
    }

    return(
        <div inline="true">
            <strong>My Balance: </strong>
            {balance.toLocaleString() + '  '} DTK
        </div>
    );

}