import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import './bootstrap.min.css';
import store from './store';
import App from './App';
import 'mapbox-gl/dist/mapbox-gl.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);