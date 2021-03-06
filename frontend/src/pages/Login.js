import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setUser, setAccessToken } from '../store/slicers/auth';

import { SendAPIRequest } from '../utils/api-calls';

import { Alert } from 'react-bootstrap';

import LoginForm from '../Components/LoginForm';

export default function Login(props) {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const accessToken = useSelector((store) => store.auth.accessToken);

  /**
   * Redirects to the tasks list page
   *
   * @returns {void}
   */
  const redirectAfterLogin = () => {
    props.history.replace({ pathname: '/tasks' });
  };

  /**
   * Sends a POST request to the API with the email and password.
   * If the request is setLoading, the user is redirected to the tasks list page
   *
   * @param {Event} event
   *
   * @return {void}
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setError(null);
    setLoading(true);

    SendAPIRequest('users/login/', accessToken, loginForm, 'POST', false)
      .then((response) => {
        const { data } = response;

        dispatch(setUser(data.user));
        dispatch(setAccessToken(data.access__token));

        redirectAfterLogin();
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  /**
   * Handle input change
   *
   * This method must be called in the input onChange event.
   * Spread the current taskForm values with the event target's value provided.
   * The field name is based in the event target's name.
   *
   * @param {InputEvent} event
   * @returns {void}
   */
  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldType = typeof loginForm[fieldName];
    let value = event.target.value;

    if (!loading) {
      switch (fieldType) {
        case 'boolean':
          value = event.target.checked;
          break;
        case 'number':
          value = parseInt(event.target.value || 0);
          break;
        default:
          value = value || '';
      }

      setLoginForm({
        ...loginForm,
        [fieldName]: value,
      });
    }
  };

  useEffect(() => {
    if (accessToken) {
      redirectAfterLogin();
    }
  }, []);

  return (
    <React.Fragment>
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <LoginForm disabled={loading} loginForm={loginForm} submitMethod={handleSubmit} changeMethod={handleChange} />
    </React.Fragment>
  );
}
