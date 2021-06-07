/* Layout component */

// React
import React from 'react';

// React Bootstrap
import { Container } from 'react-bootstrap';

// Components
import Header from './Header';

export default function Layout(props) {
  return (
    <React.Fragment>
      <Header />
      <Container className="my-3">{props.children}</Container>
    </React.Fragment>
  );
}
