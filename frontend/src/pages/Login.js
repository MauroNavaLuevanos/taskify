import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setUser, setAccessToken } from '../store/slicers/auth';

import { Form, Button, Alert } from 'react-bootstrap';

import { SendAPIRequest } from '../utils/api-calls';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const accessToken = useSelector((store) => store.auth.accessToken);

  const redirectAfterLogin = () => {
    props.history.replace({ pathname: '/tasks' });
  };

  if (!accessToken) {
    const localAccessToken = window.localStorage.getItem('taskifyAccesToken');

    if (localAccessToken) {
      setAccessToken(localAccessToken);
    }
  }

  if (accessToken) {
    redirectAfterLogin();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setError(null);
    setLoading(true);

    SendAPIRequest('users/login/', 'a', { email, password }, 'POST', false)
      .then((response) => {
        const { data } = response;

        dispatch(setUser(data.user));
        dispatch(setAccessToken(data.access__token));

        setTimeout(() => {
          setLoading(false);

          redirectAfterLogin();
        }, 500);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          disabled={loading}
          name="email"
          value={email}
          type="email"
          autoComplete="true"
          required
          placeholder="Enter your emali"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          disabled={loading}
          name="password"
          value={password}
          type="password"
          required
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button type="submit">Login</Button>
    </Form>
  );
}
