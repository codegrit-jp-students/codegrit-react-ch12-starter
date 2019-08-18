import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Diagnosis from './components/DiagnosisForm';

class Top extends Component {
  render() {
    return (
      <div>
        <Header />
        <Diagnosis />
        <Footer />
      </div>
    );
  }
}

export default Top;