/* Task form */

// React
import React from 'react';

import { useSelector } from 'react-redux';

// React Bootstrap
import { Alert, Form, Button, InputGroup } from 'react-bootstrap';

export default function EditTask(props) {
  const { taskForm, changeMethod, submitMethod, disabled } = props;
  const tasksTimeLabels = useSelector((store) => store.tasks.tasksTimeLabels);

  // Task time label, detects if the the time limit is short, medium or large
  const timeLimit = taskForm.time_limit || 0;
  const taskTimeLabel = tasksTimeLabels.find((ttl) => (timeLimit >= ttl.min && timeLimit <= ttl.max) || !ttl.max);

  if (!taskForm) {
    return <Alert variant="danger">Invalid task form data provided</Alert>;
  }

  if (!changeMethod) {
    return (
      <Alert variant="danger">
        Invalid change form field function provided. <br /> Provide prop changeMethod.
      </Alert>
    );
  }

  if (!submitMethod) {
    return (
      <Alert variant="danger">
        Invalid submit form method provided. <br /> Provide prop submitMethod.
      </Alert>
    );
  }

  return (
    <Form onSubmit={submitMethod}>
      <Form.Check
        disabled={disabled}
        type="checkbox"
        name="finished"
        onChange={changeMethod}
        checked={taskForm.finished}
        label="Task Completed"
      ></Form.Check>

      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name*</Form.Label>
        <Form.Control
          disabled={disabled}
          name="name"
          value={taskForm.name}
          type="text"
          required
          placeholder="Incredible task name"
          onChange={changeMethod}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="time_limit">
        <Form.Label>Time Limit (Minutes)*</Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text className={'text-' + taskTimeLabel.color}>{taskTimeLabel.label}</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            disabled={disabled}
            name="time_limit"
            value={taskForm.time_limit}
            type="number"
            required
            placeholder="30"
            onChange={changeMethod}
          />
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Description</Form.Label>
        <Form.Control
          disabled={disabled}
          name="description"
          as="textarea"
          rows={4}
          value={taskForm.description}
          type="text"
          placeholder="Incredible task description"
          onChange={changeMethod}
        />
      </Form.Group>

      <Button type="submit" disabled={disabled} variant="primary">
        Save Changes
      </Button>
    </Form>
  );
}
