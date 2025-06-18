import { legacy_createStore as createStore } from 'redux';

const initialState = { counter: 0, showCounter: true };

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + (action.payload ? action.payload : 1)
      };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    case 'TOGGLE_COUNTER':
      return { ...state, showCounter: !state.showCounter };
    default:
      return state;
  }
};

const store = createStore(counterReducer);

export default store;
