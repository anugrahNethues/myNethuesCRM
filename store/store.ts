// "use client";
import {
  createSlice,
  configureStore,
  type PayloadAction,
} from "@reduxjs/toolkit";

let tasks = [];
if (typeof localStorage !== "undefined") {
  tasks = JSON.parse(localStorage.getItem("taskEntries")!) || [];
}

export type task = {
  id: number;
  taskName: string;
  taskCategory: string;
  startTime: string;
  endTime: string;
  totalTime: string;
};

type taskState = {
  tasks: task[];
};

const initialState: taskState = { tasks };

const entriesSlice = createSlice({
  name: "task-entries",
  initialState,
  reducers: {
    addEntry(state, action: PayloadAction<task>) {
      state.tasks = [action.payload, ...state.tasks];
    },
  },
});

const store = configureStore({
  reducer: entriesSlice.reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const saveState = (state: task[]) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("taskEntries", JSON.stringify(state));
  }
};

store.subscribe(() => {
  const state = store.getState();
  saveState(state.tasks);
});

export default store;

export const entriesActions = entriesSlice.actions;
