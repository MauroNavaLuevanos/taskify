// React
import React from 'react';

// React Bootstrap
import { Alert } from 'react-bootstrap';

// Components
import TaskForm from '../Components/TaskForm';

// Utils
import { SendAPIRequest } from '../utils/api-calls';

export default class CreateTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: '3ff5cc5236d92852c74d7fc272b39de715061e8f',
      error: null,
      loading: false,
      enableToEdit: true,
      taskForm: {
        id: null,
        name: '',
        description: '',
        finished: false,
        time_limit: 0,
      },
    };
  }

  /**
   * Creates a task if the id stills as null in the taskForm.
   * Updates the task if id is defined in the taskForm, sending a PUT request to the API
   *
   * Sends the taskForm data.
   *
   * @returns {void}
   */
  saveTask = () => {
    const { accessToken, taskForm, enableToEdit } = this.state;
    const taskId = taskForm.id;
    const requestMethod = taskId ? 'PUT' : 'POST';
    let requestPath = taskId ? `tasks/${taskId}/` : 'tasks/';

    if (enableToEdit) {
      this.setState({ loading: true });

      SendAPIRequest(requestPath, accessToken, taskForm, requestMethod)
        .then((response) => {
          const { data } = response;

          this.setState({
            taskForm: data,
            enableToEdit: !data.finished,
          });
        })
        .catch((error) => {
          this.setState({ error: error.message });
        })
        .then(() => {
          this.setState({ loading: false });
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
  handleSubmit = (event) => {
    const { enableToEdit } = this.state;

    event.preventDefault();

    if (enableToEdit) {
      this.setState({ loading: true, error: null });

      this.saveTask();
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
  handleChange = (event) => {
    const { taskForm, enableToEdit } = this.state;
    const fieldName = event.target.name;
    const fieldType = typeof taskForm[fieldName];
    let value = event.target.value;

    switch (fieldType) {
      case 'boolean':
        value = event.target.checked;
        break;
      case 'number':
        value = parseInt(event.target.value);
        break;
      default:
        value = value || '';
    }

    if (enableToEdit) {
      this.setState({
        taskForm: {
          ...taskForm,
          [fieldName]: value,
        },
      });
    }
  };

  render() {
    const { error, taskForm, loading } = this.state;

    if (loading) {
      return <h1>Loading...</h1>;
    }

    return (
      <React.Fragment>
        {error && <Alert variant="danger">{error}</Alert>}
        <TaskForm taskForm={taskForm} changeMethod={this.handleChange} submitMethod={this.handleSubmit} />
      </React.Fragment>
    );
  }
}
