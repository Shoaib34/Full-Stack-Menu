import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WelcomeTitle from './WelcomeTitle'; // Import the WelcomeTitle component
import Menu from './Menu'; // Import the Menu component

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={WelcomeTitle} />
          <Route path="/menu" component={Menu} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
