//React Router
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Pages
import TasksList from '../../pages/TasksList';

// Styles
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/tasks" component={TasksList} />
      </Switch>
    </BrowserRouter>
  );
}
