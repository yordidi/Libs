import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import Router from './router';

const env = process.env.NODE_ENV

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Router);

// Hot Module Replacement API
if (module.hot && env == "dev") {
  module.hot.accept('./router', () => {
    render(Router)
  });
}