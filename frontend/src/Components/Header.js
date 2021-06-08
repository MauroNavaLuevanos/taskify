// React
import React from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../store/slicers/auth';

// React Router
import { Link } from 'react-router-dom';

// React Bootstrap
import { Navbar, Button } from 'react-bootstrap';

export default function Header(props) {
  const user = useSelector((store) => store.auth.user);
  const accessToken = useSelector((store) => store.auth.accessToken);
  const dispatch = useDispatch();

  /**
   * Removes the user and accessToken data in the store.
   * The user is redirecred automatically if the user is located in a Private Route
   */
  const logOut = () => {
    dispatch(removeUser());
  };

  return (
    <Navbar collapseOnSelect expand="lg">
      <Link className="navbar-brand" to="/tasks/">
        Taskify
      </Link>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {user && accessToken ? (
          <React.Fragment>
            <Link to="/tasks/" className="nav-link">
              Tasks
            </Link>
            <Link to="/tasks/create" className="nav-link">
              Create Task
            </Link>
            <Navbar.Text className="mr-3">Signed in as: {user.username}</Navbar.Text>
            <Button onClick={logOut} variant="outline-danger">
              Logout
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to="/login/" className="nav-link">
              Login
            </Link>
            <Link to="/signup/" className="nav-link">
              Signup
            </Link>
          </React.Fragment>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
