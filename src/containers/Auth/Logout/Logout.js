import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

const Logout = (props) => {
  const { logout } = props;
  useEffect(() => {
    logout();
  }, [logout]);

  return (<Redirect to="/" />);
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
}

export default connect(null, mapDispatchToProps)(Logout);