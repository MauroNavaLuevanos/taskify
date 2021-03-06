/*Tasks list view*/

// React
import React, { useState, useEffect } from 'react';

// React Redux
import { useSelector, useDispatch } from 'react-redux';
import { setTasks } from '../store/slicers/tasks';

// React Router
import { Link } from 'react-router-dom';

// React Bootstrap
import { Alert } from 'react-bootstrap';

// Components
import Task from '../Components/Task';

// Utils
import { SendAPIRequest } from '../utils/api-calls';

export default function TasksList() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasksFetched, setTasksFetched] = useState(false);

  const tasks = useSelector((state) => state.tasks.tasks);
  const accessToken = useSelector((store) => store.auth.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = () => {
      if (!tasksFetched) {
        SendAPIRequest('tasks/', accessToken)
          .then((response) => {
            dispatch(setTasks(response.data));
          })
          .catch((error) => {
            setError(error.message);
          })
          .then(() => {
            setLoading(false);
            setTasksFetched(true);
          });
      }
    };

    fetchTasks();
  }, [dispatch, tasksFetched]);

  const tasksList =
    tasks && tasks.length ? (
      tasks.map((task) => (task ? <Task key={task.id} task={task} /> : <React.Fragment></React.Fragment>))
    ) : (
      <Alert variant="warning">This hasn't tasks. Try creating one.</Alert>
    );

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <React.Fragment>
      <h1>Tasks List</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Link className="btn btn-primary mb-4" to="/tasks/create">
        Create Task
      </Link>

      {tasksList}
    </React.Fragment>
  );
}
