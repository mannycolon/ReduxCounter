import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';

//reducer
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
      break;
    case 'DECREMENT':
      return state - 1;
      break;
    default:
      return state;
  }
}

//dump component
const Counter = ({
    value,
    onIncrement,
    onDecrement
  }) => (
    <div>
      <h1>{value}</h1>
      <h1>hey</h1>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>
);

//actionLogger
const actionLogger = ({dispatch, getstate}) => (next) => (action) =>{
  console.log(action);
  return next(action)
}

//middleware
const middleware = applyMiddleware(actionLogger);

//store
const store = createStore(counterReducer, middleware);

//provider component
const render = () => {
  ReactDOM.render(
    <Counter
        value={store.getState()}
        onIncrement={() =>
          store.dispatch({
            type: 'INCREMENT'
          })
        }
        onDecrement={() =>
          store.dispatch({
            type: 'DECREMENT'
          })
        }
    />,
    document.getElementById('root')
  );
}


store.subscribe(render);
//initializing state to 0
render();
