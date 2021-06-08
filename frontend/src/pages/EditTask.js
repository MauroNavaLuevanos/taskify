/* Edit task page */

// React
import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

// React Bootstrap
import { Alert } from 'react-bootstrap';

// Components
import TaskForm from '../Components/TaskForm';

// Utils
import { SendAPIRequest } from '../utils/api-calls';

export default function EditTask(props) {
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
   * Fetch a task based in the id provided by react router
   *
   * @returns {void}
   */
  const fetchTask = () => {
    const taskId = props.match.params.taskId;

    SendAPIRequest(`tasks/${taskId}/`, accessToken)
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
  };

  /**
   * Update task data, sending a PUT request to the API
   *
   * Sends the taskForm data.
   *
   * @returns {void}
   */
  const updateTask = () => {
    const taskId = props.match.params.taskId;

    if (enableToEdit) {
      SendAPIRequest(`tasks/${taskId}/`, accessToken, taskForm, 'PUT')
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

    console.log();

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

      updateTask();
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!taskForm) {
    return <Alert variant="danger">Invalid task</Alert>;
  }

  return (
    <React.Fragment>
      <h1>Edit task</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <TaskForm disabled={!enableToEdit} changeMethod={handleChange} taskForm={taskForm} submitMethod={handleSubmit} />
    </React.Fragment>
  );
}
