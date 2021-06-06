//React Router
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Pages
import TasksList from '../pages/TasksList';
import Layout from './Layout';

// Styles
import './styles/App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/tasks" component={TasksList} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
