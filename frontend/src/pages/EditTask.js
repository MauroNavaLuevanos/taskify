/* Edit task page */

// React
import React from 'react';

// React Bootstrap
import { Alert } from 'react-bootstrap';

// Components
import TaskForm from '../Components/TaskForm';

export default class EditTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: '3ff5cc5236d92852c74d7fc272b39de715061e8f',
      error: null,
      enableToEdit: false,
      loading: true,
      taskForm: {
        name: '',
        description: '',
        finished: false,
        timeLimit: 0,
      },
    };
  }

  /**
   * Fetch a task based in the id provided by react router
   *
   * @returns {void}
   */
  fetchTask = async () => {
    const { accessToken } = this.state;

    const taskId = this.props.match.params.taskId;
    const endpoint = `http://localhost:8000/tasks/${taskId}/`;

    fetch(endpoint, {
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          taskForm: response,
          enableToEdit: !response.finished,
        });
      })
      .catch((err) => {
        this.setState({ error: err });
      })
      .then(() => {
        this.setState({ loading: false });
      });
  };

  /**
   * Update task data, sending a PUT request to the API
   *
   * Sends the taskForm data.
   *
   * @returns {void}
   */
  updateTask = () => {
    const { accessToken, taskForm, enableToEdit } = this.state;

    const taskId = this.props.match.params.taskId;
    const endpoint = `http://localhost:8000/tasks/${taskId}/`;

    try {
      if (enableToEdit) {
        fetch(endpoint, {
          method: 'PUT',
          body: JSON.stringify({
            ...taskForm,
          }),
          headers: {
            'content-type': 'application/json',
            Authorization: `Token ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((response) => {
            this.setState({
              taskForm: response,
              enableToEdit: !response.finished,
            });
          })
          .catch((error) => {
            this.setState({ error: error.message });
          })
          .then(() => {
            this.setState({ loading: false });
          });
      }
    } catch (error) {
      this.setState({ error: error.message });
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

      this.updateTask();
    }
  };

  componentDidMount() {
    this.fetchTask();
  }

  render() {
    const { loading, taskForm, error, enableToEdit } = this.state;

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
        <TaskForm disabled={!enableToEdit} changeMethod={this.handleChange} taskForm={taskForm} submitMethod={this.handleSubmit} />
      </React.Fragment>
    );
  }
}
