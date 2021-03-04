//Import React, Fragment
import React, { Fragment } from 'react';

//Import App.css
import './App.css';

//Import COMPONENTS (Navbar and Landing)
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

//Create a MAIN component App
const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Landing />
    </Fragment>
  );
};

export default App;
