//React Router
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Pages
import TasksList from '../pages/TasksList';
import EditTask from '../pages/EditTask';
import CreateTask from '../pages/CreateTask';

// Components
import Layout from './Layout';

// Styles
import './styles/App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/tasks" component={TasksList} />
          <Route exact path="/tasks/create" component={CreateTask} />
          <Route exact path="/tasks/:taskId" component={EditTask} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
