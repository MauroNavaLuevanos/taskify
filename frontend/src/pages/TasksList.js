/*Tasks list view*/

// React
import React from 'react';

// Components
import Task from '../Components/Task';

export default class TasksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      tasks: [],
      debug: true,
    };
  }

  fetchTasks = () => {
    const endpoint = this.state.debug ? 'http://localhost:8000/tasks/' : '';
    const accessToken = '3ff5cc5236d92852c74d7fc272b39de715061e8f';

    fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({
          tasks: response.results,
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .then(() => {
        this.setState({ loading: false });
      });
  };

  componentDidMount() {
    this.fetchTasks();
  }

  render() {
    const { tasks, loading } = this.state;

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
        {tasksList}
      </React.Fragment>
    );
  }
}
