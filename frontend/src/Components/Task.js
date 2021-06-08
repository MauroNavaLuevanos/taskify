/*Task component*/

// React
import React, { useState } from 'react';

// React Reudx
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../store/slicers/tasks';

// React Router
import { Link } from 'react-router-dom';

// React Bootstrap
import { Card, Alert, Button, Form, Spinner, Badge } from 'react-bootstrap';

// Utils
import { SendAPIRequest } from '../utils/api-calls';

export default function Task(props) {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState(props.task);
  const [error, setError] = useState(null);

  const accessToken = useSelector((store) => store.auth.accessToken);
  const tasksTimeLabels = useSelector((store) => store.tasks.tasksTimeLabels);

  // Task time label, detects if the the time limit is short, medium or large
  const timeLimit = task.time_limit || 0;
  const taskTimeLabel = tasksTimeLabels.find((ttl) => (timeLimit >= ttl.min && timeLimit <= ttl.max) || !ttl.max);

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

  /**
   * Deletes a task in the store tasks list after sending a DELETE request to the API.
   * The store action is fired only if the request response is ok
   *
   * @returns {void}
   */
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
          <Badge variant={taskTimeLabel.color}>{taskTimeLabel.label}</Badge>
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
