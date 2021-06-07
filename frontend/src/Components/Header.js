// React
import React from 'react';

// React Router
import { Link } from 'react-router-dom';

// React Bootstrap
import { Navbar } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar>
      <Navbar.Brand href="tasks/">Taskify</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Link to="/tasks/" className="nav-link">
          Tasks
        </Link>
        <Link to="/tasks/create" className="nav-link">
          Create Task
        </Link>
        <Navbar.Text>Signed in as: Mauro</Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}
