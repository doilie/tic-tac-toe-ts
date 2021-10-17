import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Game} from './features/game/Game';
import {Provider} from "react-redux";
import store from "./app/store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Game />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
