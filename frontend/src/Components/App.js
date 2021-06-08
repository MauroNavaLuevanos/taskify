//React Router
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Pages
import CreateTask from '../pages/CreateTask';
import EditTask from '../pages/EditTask';
import Login from '../pages/Login';
import TasksList from '../pages/TasksList';
import Signup from '../pages/Signup';

// Components
import Layout from './Layout';
import PrivateRoute from './PrivateRoute';

// Styles
import './styles/App.css';

export default function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/tasks" component={TasksList} />
          <PrivateRoute exact path="/tasks/create" component={CreateTask} />
          <PrivateRoute exact path="/tasks/:taskId" component={EditTask} />
        </Switch>
      </Layout>
    </Router>
  );
}
