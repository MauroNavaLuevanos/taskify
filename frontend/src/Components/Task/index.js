/*Task component*/

// React
import React from 'react';

// React Bootstrap
import { Card, Alert, Button } from 'react-bootstrap';

export default function Task(props) {
  const task = props.task;

  if (!task) {
    return <Alert>Invalid task</Alert>;
  }

  return (
    <div className="TaskWrapper p-3">
      <Card className="Task">
        <Card.Body>
          <h2>{task.name}</h2>
          <p>{task.description}</p>
        </Card.Body>
        <Card.Body>
          <Button href="#">Editar</Button>
          <Button className="ml-3" variant="danger" href="#">
            Eliminar
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
