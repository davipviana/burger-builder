import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions';
import { checkFormItemValidity } from '../../shared/utils';

import styles from './Auth.module.css';

const Auth = (props) => {
  const [controls, setControls] = useState({
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Mail Address'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      touched: false
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password'
      },
      value: '',
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      touched: false
    },
  });
  const [isSignup, setIsSignup] = useState(true);
  const { buildingBurger, authRedirectPath, setAuthRedirectPath } = props;
  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      setAuthRedirectPath('/');
    }
  }, [buildingBurger, authRedirectPath, setAuthRedirectPath])

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: event.target.value,
        valid: checkFormItemValidity(event.target.value, controls[controlName].validation),
        touched: true
      }
    }

    setControls(updatedControls);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const { email: emailControl, password: passwordControl } = controls;

    props.doAuth(emailControl.value, passwordControl.value, isSignup);
  }

  const switchAuthModeHandler = () => {
    setIsSignup(prevIsSignup => !prevIsSignup);
  };

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    })
  }

  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      onChange={(event) => inputChangedHandler(event, formElement.id)} />
  ))

  if (props.loading) {
    form = <Spinner />
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = (
      <p>{props.error.message}</p>
    );
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={styles.Auth}>
      {authRedirect}
      <h3>{isSignup ? 'SIGNUP' : 'SIGNIN'}</h3>
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button type="Success">SUBMIT</Button>
      </form>
      <Button
        onClick={switchAuthModeHandler}
        type="Danger">SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doAuth: (email, password, isSignup) => dispatch(actions.authInit(email, password, isSignup)),
    setAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);