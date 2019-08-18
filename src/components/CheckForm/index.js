/** @jsx jsx */
import React, { Component } from 'react';
import styled from '@emotion/styled/macro';
import { Formik, Form, Field } from 'formik';
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { Row, Col } from 'react-bootstrap';
import { calcBmi, calcIdealWeight ,getEvaluationJesso, getEvaluationForMale, getEvaluationForFemale } from '../../lib/diagnosisUtils'

const SubmitDiv = styled.div({
  paddingTop: 30,
  display: 'flex',
  justifyContent: 'center',
})

const btnStyle = {
  backgroundColor: '#2f2f2f',
  border: '1px solid #2f2f2f',
  color: 'rgb(255, 255, 255)',
  padding: '10px 70px',
  margin: '30px 0px'
}
const ErrorMessage = styled.div({
  color: 'rgb(255, 180, 0)',
})

const Title = styled.div({
  fontSize: 21,
  borderBottom: '4px solid rgb(186, 206, 222)',
  padding: '14 0',
  marginBottom: '30px'
})

const ResultSubTitle = styled.div({
  fontSize: '17px',
  fontWeight: 'bold',
  marginBottom: '1em',
  color: 'Black',
})

const ResultText = styled.p({
  fontSize: '21px',
  marginBottom: '70px'
})

export default class extends Component {
  state = {
    formInput : false,
  }
  validate = (values) => {
    const { 
      gender,
      age,
      height,
      weight,
      fatRate,
    } = values;
    const errors = {}
    if (gender === '') {
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
    } else {
      this.setState(values)
    }
  }

  handleSubmit = () => {
    this.setState({
      formInput : true,
    })
  }
  render(){
    const { 
      formInput,
      gender,
      height,
      weight,
      fatRate 
    } = this.state;

    let result = 
      <div css={{
        display: 'flex',
        justifyContent: 'center',
        padding:100,
      }}>診断結果がここに表示されます。</div>

    if (formInput) {
      const idealWeight = calcIdealWeight(height)
      const bmi = calcBmi(height, weight)
      const evaluationJesso = getEvaluationJesso(bmi, fatRate)
      const evaluation = (gender === 'm') ? getEvaluationForMale(bmi, fatRate) : getEvaluationForFemale(bmi, fatRate)
      result = (
        <div>
          <ResultSubTitle>日本肥満学会の定める理想体重(BMI22)</ResultSubTitle>
          <ResultText>{idealWeight}</ResultText>
          <ResultSubTitle>BMI</ResultSubTitle>
          <ResultText>{bmi}</ResultText>
          <ResultSubTitle>日本肥満学会基準の体型診断(体脂肪率を考慮しません)</ResultSubTitle>
          <ResultText>{evaluationJesso}</ResultText>
          <ResultSubTitle>体脂肪率を考慮した体型診断</ResultSubTitle>
          <ResultText>{evaluation}</ResultText>
        </div>
      )
    }
    
    return(
      <Formik
        initialValues={{ 
          gender: '',
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
                    <span css={css`
                      align-self: flex-end;
                      margin-left: 10px;
                    `}>歳</span>
                  </div>
                  {errors.age && <ErrorMessage>{errors.age}</ErrorMessage>}
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>身長:</label>
                  <div css={css`
                    display:flex; 
                    flex-direction: row;`
                  }>
                  <Field
                    name="height"
                    type="number"
                    placeholder="例: 158"
                  />
                  <span css={css`
                    align-self: flex-end;
                    margin-left: 10px;
                  `}>cm</span>
                  </div>
                  {errors.height && <ErrorMessage>{errors.height}</ErrorMessage>}
                </Col>
                <Col>
                  <label>体重:</label>
                  <div css={css`
                    display:flex; 
                    flex-direction: row;`
                  }>
                    <Field
                      name="weight"
                      type="number"
                      placeholder="例: 44"
                    />
                    <span css={css`
                      align-self: flex-end;
                      margin-left: 10px;
                      `
                    }>kg</span>
                  </div>
                  {errors.weight && <ErrorMessage>{errors.weight}</ErrorMessage>}
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>体脂肪率:</label>
                  <div css={css`
                    display:flex; 
                    flex-direction: row;`
                  }>
                    <Field
                      name="fatRate"
                      type="number"
                      step="0.1"
                      placeholder="例: 25.4"
                    />
                    <span css={css`
                      align-self: flex-end;
                      margin-left: 10px;
                    `}>%</span>
                  </div>
                  {errors.fatRate && <ErrorMessage>{errors.fatRate}</ErrorMessage>}
                </Col>
                <Col>
                </Col>
              </Row>
              <SubmitDiv>
                <button type="submit" css={btnStyle}>診断結果を見る</button>
              </SubmitDiv>
              <Title>２．診断結果</Title>
              {result}
            </Form>
          )
        }}
      </Formik>
    )
  }
}