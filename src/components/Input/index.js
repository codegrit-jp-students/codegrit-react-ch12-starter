import React, { Component } from 'react';
import styled from '@emotion/styled/macro';
import { Formik, Form, Field } from 'formik';
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { Row, Col } from 'react-bootstrap';

const SubmitDiv = styled.div({
  paddingTop: 30,
  display: 'flex',
  justifyContent: 'center',
})

const btnStyle = {
  backgroundColor: '#2f2f2f',
  border: '1px solid #2f2f2f',
}
const ErrorMessage = styled.div({
})

const Title = styled.div({
  fontSize: 21,
  borderBottom: '4px solid rgb(186, 206, 222)',
  padding: '14 0',
})
export default class extends Component {
  validate = (values) => {
    const { 
      gender,
      age,
      height,
      weight,
      fatRate,
    } = values;
    console.log(values)
    const errors = {}
    if (gender === 'n') {
      errors.gender = '性別の選択は必須です。'
    }
    if (age === '') {
      errors.age = '年齢の入力は必須です'
    }
    if (weight === '') {
      errors.weight = '体重の入力は必須です'
    }
    if (height === '') {
      errors.height = '身長の入力は必須です'
    }
    if (fatRate === '') {
      errors.fatRate = '体脂肪率の入力は必須です'
    }
    if (Object.keys(errors).length > 0) {
      return errors
    }
  }

  handleSubmit = () => {
    console.log('submit')
  }

  render(){
    return(
      <Formik
        initialValues={{ 
          gender: "n",
          age:'',
          height:'',
          weight:'',
          fatRate:'',
        }}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ 
          errors,
        }) => {
          return (
            <Form>
              <Title>１．あなたの体格について入力してください</Title>
              <Row>
                <Col>
                  <label>性別:</label>
                  <Field
                    component="select"
                    name="gender"
                    >
                    <option value="n">性別を選んでください</option>
                    <option value="m">男性</option>
                    <option value="f">女性</option>
                  </Field>
                  {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}
                </Col>
                <Col>
                  <label>年齢:</label>
                  <div css={css`
                    display:flex; 
                    flex-direction: row;`
                  }>
                    <Field
                      name="age"
                      type="number"
                      placeholder="例: 25"
                    />
                    <span>歳</span>
                  </div>
                  {errors.age && <ErrorMessage>{errors.age}</ErrorMessage>}
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>身長:</label>
                  <Field
                    name="height"
                    type="number"
                    placeholder="例: 158"
                  >
                  </Field>
                  <span>cm</span>
                  {errors.height && <ErrorMessage>{errors.height}</ErrorMessage>}
                </Col>
                <Col>
                  <label>体重:</label>
                  <div>
                    <Field
                      name="weight"
                      type="number"
                      placeholder="例: 44"
                    />
                    <span>kg</span>
                  </div>
                  {errors.weight && <ErrorMessage>{errors.weight}</ErrorMessage>}
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>体脂肪率:</label>
                  <div>
                    <Field
                      name="fatRate"
                      type="number"
                      step="0.1"
                      placeholder="例: 25.4"
                    />
                    <span>%</span>
                  </div>
                  {errors.fatRate && <ErrorMessage>{errors.fatRate}</ErrorMessage>}
                </Col>
                <Col>
                </Col>
              </Row>
              <SubmitDiv>
                <button type="submit" css={btnStyle}>診断結果を見る</button>
              </SubmitDiv>
            </Form>
          )
        }}
      </Formik>
    )
  }
}