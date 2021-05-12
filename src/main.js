// @flow
import React from 'react';
import App from 'fusion-react';
import Router from 'fusion-plugin-react-router';
import Styletron from 'fusion-plugin-styletron-react';

import root from './root.js';
import TodosPlugin from './plugins/todos.js';

export default () => {
  // const root = <div>Hello world</div>;
  const app = new App(root);

  if (__NODE__) {
    app.middleware(require('koa-bodyparser')());
    app.middleware(TodosPlugin);
  }

  return app;
};
