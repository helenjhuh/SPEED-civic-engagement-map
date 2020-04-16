// for polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/Application';

import './app.scss';

ReactDOM.render(<Application />, document.getElementById('root'));
