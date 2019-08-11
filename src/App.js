import React from 'react';
import Helmet from 'react-helmet';
import Top from './Top';


function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Check Body</title>
        <meta name="description" content="CodeGritのReactコースレッスン12のために作られたフィットネス診断アプリです" />
      </Helmet>
      <Top />
    </div>
  );
}

export default App;
