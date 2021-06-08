import React from 'react';

import { Link } from 'react-router-dom';

import { Form, Button } from 'react-bootstrap';

export default function LoginForm(props) {
  const { signupForm, disabled, changeMethod, submitMethod } = props;

  return (
    <Form onSubmit={submitMethod}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          disabled={disabled}
          name="email"
          value={signupForm.email}
          type="email"
          autoComplete="true"
          required
          placeholder="Enter your emali"
          onChange={changeMethod}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username*</Form.Label>
        <Form.Control
          disabled={disabled}
          name="username"
          value={signupForm.username}
          type="text"
          autoComplete="true"
          required
          placeholder="Enter your username"
          onChange={changeMethod}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="firstName">
        <Form.Label>First Name*</Form.Label>
        <Form.Control
          disabled={disabled}
          name="first_name"
          value={signupForm.first_name}
          type="text"
          autoComplete="true"
          required
          placeholder="Enter your first name"
          onChange={changeMethod}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="lastName">
        <Form.Label>Last Name*</Form.Label>
        <Form.Control
          disabled={disabled}
          name="last_name"
          value={signupForm.last_name}
          type="text"
          autoComplete="true"
          required
          placeholder="Enter your last name"
          onChange={changeMethod}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password*</Form.Label>
        <Form.Control
          disabled={disabled}
          name="password"
          value={signupForm.password}
          type="password"
          required
          placeholder="Enter your password"
          onChange={changeMethod}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="passwordConfirmation">
        <Form.Label>Password Confirmation*</Form.Label>
        <Form.Control
          disabled={disabled}
          name="password_confirmation"
          value={signupForm.password_confirmation}
          type="password"
          required
          placeholder="Enter your password"
          onChange={changeMethod}
        />
      </Form.Group>

      <Button type="submit">Create Account</Button>
      <p className="mt-4 mb-0">Do you already have an account?</p>
      <Link className="btn btn-outline-primary" to="/login">
        Login
      </Link>
    </Form>
  );
}
