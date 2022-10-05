import { InputGroup, InputGroupText, Row, Col, Input, Label } from 'reactstrap'

const InputGroupCbAndRadio = props => {
  return (
    <Row>
      <Col className='mb-md-0 mb-1' md='6' sm='12'>
        <InputGroup>
          <InputGroupText>
            <div className='form-check'>
              <Input
                type='radio'
                name='inputGroupExampleRadio'
                id='exampleCustomRadio'
              />
            </div>
          </InputGroupText>
          <Input type='text' value={props.name1} placeholder='Message' />
        </InputGroup>
      </Col>
      <Col md='6' sm='12'>
        <InputGroup>
          <InputGroupText>
            <div className='form-check'>
              <Input
                type='radio'
                name='inputGroupExampleRadio'
                id='exampleCustomRadio'
              />
            </div>
          </InputGroupText>
          <Input type='text' value={props.name2} placeholder='Message' />
        </InputGroup>
      </Col>
    </Row>
  )
}

export default InputGroupCbAndRadio
