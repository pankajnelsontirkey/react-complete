import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = { value: 0, show: true };

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    increase(state, action) {
      state.value += action.payload;
    },
    toggleCounter(state) {
      state.show = !state.show;
    }
  }
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
