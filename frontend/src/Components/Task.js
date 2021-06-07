/*Task component*/

// React
import React from 'react';

// React Router
import { Link } from 'react-router-dom';

// React Bootstrap
import { Card, Alert, Button } from 'react-bootstrap';

export default function Task(props) {
  const task = props.task;

  if (!task) {
    return <Alert variant="danger">Invalid task</Alert>;
  }

  return (
    <div className="TaskWrapper p-3">
      <Card className="Task">
        <Card.Body>
          <h2>{task.name}</h2>
          <p>{task.description}</p>
        </Card.Body>
        <Card.Body>
          {!task.finished && (
            <Link className="btn btn-primary" to={`tasks/${task.id}/`}>
              Edit
            </Link>
          )}
          <Button className="ml-3" variant="danger" href="#">
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
