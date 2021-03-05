//Import REACT, Fragment and useState() hook
import React, { Fragment, useState } from 'react';

//Import LINK
import { Link } from 'react-router-dom';

//Create a COMPONENT Login
const Login = () => {
  //Create a useState() hook
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  //DESTRUCTURING all the data from state to separate variables
  const { email, password } = formData;

  //Create a function to work with changes on inputs
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Create a function to submitting new data
  const onSubmitHandler = async (e) => {
    //Will not sent a default value
    e.preventDefault();
  };

  //JSX to return
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>

      <p className='lead'>
        <i className='fas fa-user'></i> Sign into your account
      </p>

      <form className='form' onSubmit={(e) => onSubmitHandler(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            required
            value={email}
            onChange={(e) => onChangeHandler(e)}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>

        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            required
            value={password}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>

        <input
          type='submit'
          className='btn btn-primary'
          value='Login'
          onSubmit={(e) => onSubmitHandler(e)}
        />
      </form>

      <p className='my-1'>
        Do not have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
