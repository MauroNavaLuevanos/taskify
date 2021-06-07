/* Layout component */

// React
import React from 'react';

// React Bootstrap
import { Container } from 'react-bootstrap';

export default function Layout(props) {
  return <Container className="my-3">{props.children}</Container>;
}
