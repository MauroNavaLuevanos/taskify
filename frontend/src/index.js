// React
import React from 'react';
import ReactDOM from 'react-dom';

// React redux
import { Provider } from 'react-redux';
import store from './store'; // Store

// Utils
import reportWebVitals from './reportWebVitals';

// Components
import App from './Components/App';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
