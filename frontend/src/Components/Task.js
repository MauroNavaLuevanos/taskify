/*Task component*/

// React
import React from 'react';

// React Router
import { Link } from 'react-router-dom';

// React Bootstrap
import { Card, Alert, Button, Form } from 'react-bootstrap';

export default function Task(props) {
  const task = props.task;

  if (!task) {
    return <Alert variant="danger">Invalid task</Alert>;
  }

  return (
    <div className="TaskWrapper mb-3">
      <Card className="Task">
        <Card.Body>
          <Form.Check checked={task.finished} disabled={task.finished} label="Task Completed" />
          <h2>{task.name}</h2>
          <p>{task.description}</p>
        </Card.Body>
        {!task.finished && (
          <Card.Body>
            <Link className="btn btn-primary mr-3" to={`tasks/${task.id}/`}>
              Edit
            </Link>
            <Button variant="danger" href="#">
              Delete
            </Button>
          </Card.Body>
        )}
      </Card>
    </div>
  );
}
