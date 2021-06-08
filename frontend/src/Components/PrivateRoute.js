import React from 'react';

import { Redirect, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';

export default function PrivateRoute({ component: Component, ...rest }) {
  const accessToken = useSelector((store) => store.auth.accessToken);

  return <Route {...rest} render={(routeProps) => (accessToken ? <Component {...routeProps} /> : <Redirect to="/login" />)} />;
}
