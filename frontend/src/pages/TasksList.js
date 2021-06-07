/*Tasks list view*/

// React
import React from 'react';

// React Router
import { Link } from 'react-router-dom';

// React Bootstrap
import { Alert } from 'react-bootstrap';

// Components
import Task from '../Components/Task';

// Utils
import { SendAPIRequest } from '../utils/api-calls';

export default class TasksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      loading: true,
      tasks: [],
      debug: true,
    };
  }

  fetchTasks = () => {
    const accessToken = '3ff5cc5236d92852c74d7fc272b39de715061e8f';

    SendAPIRequest('tasks/', accessToken)
      .then((response) => {
        this.setState({
          tasks: response.results,
        });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      })
      .then(() => {
        this.setState({ loading: false });
      });
  };

  componentDidMount() {
    this.fetchTasks();
  }

  render() {
    const { tasks, loading, error } = this.state;

    const tasksList = tasks.length ? (
      tasks.map((task, taskIndex) => <Task key={taskIndex} task={task} />)
    ) : (
      <h2>No hay tareas asignadas a este usuario</h2>
    );

    if (loading) {
      return 'Loading...';
    }
    return (
      <React.Fragment>
        <h1>Tasks List</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Link className="btn btn-primary mb-4" to="/tasks/create">
          Create Task
        </Link>
        {tasksList}
      </React.Fragment>
    );
  }
}
