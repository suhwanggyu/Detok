import React from "react";
import { InputGroup, FormControl, Button, Form } from 'react-bootstrap';
import style from 'css/RegisterDefendee.module.css';

class RegisterDefendee extends React.Component {
    state = {
        name:'',
        eth:0,
        reward:0,
        inspectCount:0,
        detailed:'',
        img:null
    }

    handleNameChange = (e) => {
        this.setState({
            name : e.target.value
        });
    }

    handleEthChange = (e) => {
        this.setState({
            eth : e.target.value
        });
    }
    handleRewardChange = (e) => {
        this.setState({
            reward : e.target.value
        });
    }
    handleCountChange = (e) => {
        this.setState({
            inspectCount : parseInt(e.target.value)
        });
    }
    handleDetailedChange = (e) => {
        this.setState({
            detailed : e.target.value
        });
    }
    handleImgChange = (e) => {
        this.setState({
            img : e.target.files[0]
        });
    }
    submitToServer = () => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function (e) {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200) {
                let parsed = JSON.parse(xhr.response);
            } else {
                console.log('Error!');
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/defendee/registerDetailed');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify({'detail':this.state.detailed,'img':1}));
    }
    
    submit = (e) => {
        e.preventDefault();
        let web3 = this.props.web3;
        let approve = new XMLHttpRequest();
        const me = this;
        
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = async function (e) {
            if(xhr.readyState !== XMLHttpRequest.DONE) return;
            if(xhr.status === 200) {
                let parsed = JSON.parse(xhr.response);
                let abi = parsed.abi;
                let contract = new web3.eth.Contract(abi, parsed.networks[process.env.REACT_APP_ID].address);
                let name = await web3.utils.fromUtf8(me.state.name);
                let eth =  await web3.utils.toWei(me.state.eth, "ether");
                let reward = await web3.utils.toWei(me.state.reward, "ether");
                let account = await web3.eth.getAccounts();
                await contract.methods.registerDefendee(name,eth, reward, me.state.inspectCount).send( {from:account[0], value : web3.utils.toWei(me.state.eth, "ether"), gas: 300000});
                this.submitToServer();
            } else {
                console.log('Error!');
            }
        }
        xhr.open('POST',process.env.REACT_APP_API + '/contractjson');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify({'type':'JudgeByMedia'}));
    }

    render() {
        return(
            <Form className={style.regform}>
                <InputGroup className={style.inputF} size="sm">
                    <InputGroup.Prepend>
                        <InputGroup.Text className={style.regdef} id="basic-addon1">Work Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        type="text"
                        placeholder="Defendee Name"
                        onChange={this.handleNameChange}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                    
                </InputGroup>
                <InputGroup className={style.inputF} size="sm">
                    <InputGroup.Prepend>
                        <InputGroup.Text className={style.regdef} id="basic-addon1">Register Fee</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        type="text"
                        placeholder="Ether"
                        onChange={this.handleEthChange}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className={style.inputF} size="sm">
                <InputGroup.Prepend>
                        <InputGroup.Text className={style.regdef} id="basic-addon1">Reward</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        type="text"
                        placeholder="Reward"
                        onChange={this.handleRewardChange}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className={style.inputF} size="sm">
                <InputGroup.Prepend>
                        <InputGroup.Text className={style.regdef} id="basic-addon1">Verifier Count</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        type="text"
                        placeholder="Verifier Counter"
                        onChange={this.handleCountChange}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <InputGroup className={style.inputF} size="sm">
                <InputGroup.Prepend>
                        <InputGroup.Text className={style.regdef} id="basic-addon1">Detailed</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        type="text"
                        placeholder="Detailed"
                        onChange={this.handleDetailedChange}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <Button variant="info" type="submit" onClick={this.submit}>등록하기</Button>
            </Form>
        );
    }
}


export default RegisterDefendee;