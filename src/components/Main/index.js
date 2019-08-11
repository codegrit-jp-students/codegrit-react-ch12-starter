import React, { Component } from 'react';
import styled from '@emotion/styled/macro';
import { Container, Row, Col } from 'react-bootstrap';
import Input from '../Input';
import Result from '../Result';

const Wrapper = styled.main({
  minHeight: '400px',
  margin: '50px 0',
  height: '100%',
})

class Main extends Component {
  state = {
    compInput : false,
  }
  render() {
    let {compInput} = this.state;
    let result = (compInput) ? <Result/> : <></>
    return (
      <Wrapper>
        <Container>
          <Row className="justify-content-md-center">
            <Col md={9} sm={12}>
              <Input/>
              {result}
            </Col>
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default Main;