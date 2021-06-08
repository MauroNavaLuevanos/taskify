import React from 'react';

import { Link } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';

export default function LoginForm(props) {
  const { loginForm, disabled, changeMethod, submitMethod } = props;

  return (
    <Form onSubmit={submitMethod}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          disabled={disabled}
          name="email"
          value={loginForm.email}
          type="email"
          autoComplete="true"
          required
          placeholder="Enter your emali"
          onChange={changeMethod}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          disabled={disabled}
          name="password"
          value={loginForm.password}
          type="password"
          required
          placeholder="Enter your password"
          onChange={changeMethod}
        />
      </Form.Group>

      <Button type="submit">Login</Button>
      <p className="mt-4 mb-0">Don't you have an account?</p>
      <Link className="btn btn-outline-primary" to="/signup">
        Signup
      </Link>
    </Form>
  );
}
