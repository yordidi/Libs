/*
 * Module dependencies
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Routes from './routes';

const env = process.env.NODE_ENV;

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

/*
 * render page.
 */

render(Routes);

// Hot Module Replacement API
if (module.hot && env == "dev") {
 module.hot.accept('./routes', () => {
   render(Routes)
 });
}