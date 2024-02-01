// "use client";

import { createSlice, configureStore } from "@reduxjs/toolkit";

let tasks = [];
if (typeof localStorage !== "undefined") {
  tasks = JSON.parse(localStorage.getItem("taskEntries")) || [];
}

// let tasks = JSON.parse(localStorage.getItem("taskEntries")) || [];

const initialState = { tasks: tasks };

const entriesSlice = createSlice({
  name: "task-entries",
  initialState,
  reducers: {
    addEntry(state, action) {
      state.tasks = [action.payload, ...state.tasks];
    },
  },
});

const store = configureStore({
  reducer: entriesSlice.reducer,
});

const saveState = (state) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("taskEntries", JSON.stringify(state));
  }
  // localStorage.setItem("taskEntries", JSON.stringify(state));
};

store.subscribe(() => {
  const state = store.getState();
  saveState(state.tasks);
});

export default store;

export const entriesActions = entriesSlice.actions;
