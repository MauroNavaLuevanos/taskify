/* Layout component */

// React
import React from 'react';

// React Bootstrap
import { Container } from 'react-bootstrap';

export default function (props) {
  return <Container>{props.children}</Container>;
}
