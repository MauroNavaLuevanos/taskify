/*Task component*/

// React
import React, { useState } from 'react';

// React Router
import { Link } from 'react-router-dom';

// React Bootstrap
import { Card, Alert, Button, Form, Spinner } from 'react-bootstrap';

// Utils
import { SendAPIRequest } from '../utils/api-calls';

export default function Task(props) {
  const [loading, setLoading] = useState(false);
  const [accesToken, setAccesToken] = useState('3ff5cc5236d92852c74d7fc272b39de715061e8f');
  const [task, setTask] = useState(props.task);
  const [error, setError] = useState(null);

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
   * Sets a task as finished, sending a PATCH method the finished attribute as
   * true
   *
   * @returns {void}
   */
  function SetTaskAsFinished() {
    const taskId = task.id;

    setLoading(true);
    setError(null);

    SendAPIRequest(`tasks/${taskId}/`, accesToken, { finished: true }, 'PATCH')
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
  }

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
            <Button variant="danger" href="#" disabled={loading}>
              Delete
            </Button>
          </Card.Body>
        )}
      </Card>
    </div>
  );
}
