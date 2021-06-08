// React
import React from 'react';

// Redux
import { useSelector } from 'react-redux';

// React Router
import { Link } from 'react-router-dom';

// React Bootstrap
import { Navbar } from 'react-bootstrap';

export default function Header() {
  const user = useSelector((store) => store.auth.user);

  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand href="tasks/">Taskify</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Link to="/tasks/" className="nav-link">
          Tasks
        </Link>
        <Link to="/tasks/create" className="nav-link">
          Create Task
        </Link>
        {user && <Navbar.Text>Signed in as: {user.username}</Navbar.Text>}
      </Navbar.Collapse>
    </Navbar>
  );
}
