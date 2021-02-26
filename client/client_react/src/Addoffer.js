import { Input } from 'react-bootstrap';
import { Button } from 'react-bootstrap';



class Addoffer extends React.Component{
    render() {
      let inputs = this.props.inputs;
      return (
          <div>
              tokenAddress:
              <input
                  name={inputs.inputs[0].name}
                  onChange={inputs.handleInputChange}
                  type={inputs.inputs[0].type}/>
  
              tokenAmount:
              <input  
                  name={inputs.inputs[1].name} 
                  onChange={inputs.handleInputChange}
                  type={inputs.inputs[1].type}/>
  
              <Button onClick={inputs.handleSubmit}>Submit</Button>
          </div>
      )
    }
  }