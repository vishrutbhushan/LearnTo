import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={<div>TESTTT</div>} />
          <Route path="/about" component={<div>TESTTT</div>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;