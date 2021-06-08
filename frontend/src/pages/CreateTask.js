// React
import React, { useState } from 'react';

import { useSelector } from 'react-redux';

// React Bootstrap
import { Alert } from 'react-bootstrap';

// Components
import TaskForm from '../Components/TaskForm';

// Utils
import { SendAPIRequest } from '../utils/api-calls';

export default function CreateTask() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enableToEdit, setEnableToEdit] = useState(true);
  const [taskForm, setTaskForm] = useState({
    id: null,
    name: '',
    description: '',
    finished: false,
    time_limit: 0,
  });

  const accessToken = useSelector((store) => store.auth.accessToken);

  /**
   * Creates a task if the id stills as null in the taskForm.
   * Updates the task if id is defined in the taskForm, sending a PUT request to the API
   *
   * Sends the taskForm data.
   *
   * @returns {void}
   */
  const saveTask = () => {
    const taskId = taskForm.id;
    const requestMethod = taskId ? 'PUT' : 'POST';
    let requestPath = taskId ? `tasks/${taskId}/` : 'tasks/';

    if (enableToEdit) {
      setLoading(true);

      SendAPIRequest(requestPath, accessToken, taskForm, requestMethod)
        .then((response) => {
          const { data } = response;

          setTaskForm(data);
          setEnableToEdit(!data.finished);
        })
        .catch((error) => {
          setError(error.message);
        })
        .then(() => {
          setLoading(false);
        });
    }
  };

  /**
   * Handles the submit event fired from a form
   *
   * This method must be called in the form onSubmit event.target.
   * Calls the updateTaskMethod.
   *
   * @param {Event} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    if (enableToEdit) {
      setLoading(true);
      setError(null);

      saveTask();
    }
  };

  /**
   * Handle input change
   *
   * This method must be called in the input onChange event.
   * Spread the current taskForm values with the event target's value provided.
   * The field name is based in the event target's name.
   *
   * @param {InputEvent} event
   * @returns {void}
   */
  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldType = typeof taskForm[fieldName];
    let value = event.target.value;

    switch (fieldType) {
      case 'boolean':
        value = event.target.checked;
        break;
      case 'number':
        value = parseInt(event.target.value || 0);
        break;
      default:
        value = value || '';
    }

    if (enableToEdit) {
      setTaskForm({
        ...taskForm,
        [fieldName]: value,
      });
    }
  };

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <React.Fragment>
      <h1>Create task</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <TaskForm taskForm={taskForm} changeMethod={handleChange} submitMethod={handleSubmit} />
    </React.Fragment>
  );
}
