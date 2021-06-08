/*Task component*/

// React
import React, { useState } from 'react';

// React Reudx
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../store/slicers/tasks';

// React Router
import { Link } from 'react-router-dom';

// React Bootstrap
import { Card, Alert, Button, Form, Spinner } from 'react-bootstrap';

// Utils
import { SendAPIRequest } from '../utils/api-calls';

export default function Task(props) {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState(props.task);
  const [error, setError] = useState(null);

  const accessToken = useSelector((store) => store.auth.accessToken);

  const dispatch = useDispatch();

  let TaskCardClasses = 'Task';

  if (!task.finished && !loading) {
    TaskCardClasses += ' shadow';
  } else {
    TaskCardClasses += ' bg-light';
  }

  if (!task) {
    return <Alert variant="danger">Invalid task</Alert>;
  }

  const DeleteTask = () => {
    const taskId = task.id;
    setError(null);
    setLoading(true);

    SendAPIRequest(`tasks/${task.id}/`, accessToken, {}, 'DELETE')
      .then(() => {
        dispatch(deleteTask(taskId));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  /**
   * Sets the task as finished, sending a PATCH method with the finished attribute as true
   *
   * @returns {void}
   */
  const SetTaskAsFinished = () => {
    const taskId = task.id;

    setLoading(true);
    setError(null);

    SendAPIRequest(`tasks/${taskId}/`, accessToken, { finished: true }, 'PATCH')
      .then((response) => {
        const { data } = response;

        setTask(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
  };

  return (
    <div className="TaskWrapper mb-3">
      <Card className={TaskCardClasses}>
        <Card.Body>
          {loading && (
            <Spinner animation="border" role="status" size="sm">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}

          <Form.Check checked={task.finished} disabled={task.finished || loading} label="Task Completed" onChange={SetTaskAsFinished} />
          <h2>{task.name}</h2>
          <p>{task.description}</p>
          {error && <Alert>{error}</Alert>}
        </Card.Body>

        {!task.finished && (
          <Card.Body>
            <Link className="btn btn-primary mr-3" to={`/tasks/${task.id}/`}>
              Edit
            </Link>
            <Button variant="danger" onClick={DeleteTask} disabled={loading}>
              Delete
            </Button>
          </Card.Body>
        )}
      </Card>
    </div>
  );
}
