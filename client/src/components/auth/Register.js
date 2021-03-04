//Import REACT, Fragment and useState() hook
import React, { Fragment, useState } from 'react';

//Create a COMPONENT Register
const Register = () => {
  //Create a useState() hook
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  //DESTRUCTURING all the data from state to separate variables
  const { name, email, password, password2 } = formData;

  //Create a function to work with changes on inputs
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Create a function to submitting new data
  const onSubmitHandler = (e) => {
    //Will not sent a default value
    e.preventDefault();
    //Check if password and confirm password are the same
    if (password !== password2) {
      console.log('Do not match');
    } else {
      console.log(formData);
    }
  };

  //JSX to return
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>

      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>

      <form className='form' onSubmit={(e) => onSubmitHandler(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            required
            value={name}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>

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

        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            required
            value={password2}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>

        <input
          type='submit'
          className='btn btn-primary'
          value='Register'
          onSubmit={(e) => onSubmitHandler(e)}
        />
      </form>

      <p className='my-1'>
        Already have an account? <a href='login.html'>Sign In</a>
      </p>
    </Fragment>
  );
};

export default Register;
