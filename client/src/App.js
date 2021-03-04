//Import React, Fragment
import React, { Fragment } from 'react';

//Import BrowserRouter, Route and Switch
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Import App.css
import './App.css';

//Import COMPONENTS (Navbar and Landing)
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

//Import COMPONENTS (Login and Register)
import Login from './components/auth/Login';
import Register from './components/auth/Register';

//Create a MAIN component App
const App = () => {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
