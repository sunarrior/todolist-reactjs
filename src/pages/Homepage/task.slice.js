import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection } from "firebase/firestore";

import { fireStore } from "../../config/firebase.config";

export const taskSlice = createSlice({
  name: "task",
  initialState: [
    { id: 1, content: "Completed Task", isCompleted: true },
    { id: 2, content: "Incompleted Task", isCompleted: false },
  ],
  reducers: {
    taskListAdd: (state, action) => {
      state.push(action.payload);
    },
    taskStateUpdate: (state, action) => {
      const targetIndex = state.findIndex((st) => st.id === action.payload.id);
      state[targetIndex].isCompleted = action.payload.isCompleted;
    },
    taskUpdate: (state, action) => {
      const targetIndex = state.findIndex((st) => st.id === action.payload.id);
      state[targetIndex].content = action.payload.content;
      state[targetIndex].isCompleted = false;
    },
    taskListDelete: (state, action) => {
      const targetIndex = state.findIndex((st) => st.id === action.payload);
      state.splice(targetIndex, 1);
    },
  },
});

export const fetchTaskList = createAsyncThunk(
  "task/fetchTaskList",
  async () => {
    const result = collection(fireStore, "todos");
  }
);

export const { taskListAdd, taskStateUpdate, taskUpdate, taskListDelete } =
  taskSlice.actions;

export default taskSlice.reducer;

export const selectTaskList = (state) => {
  return state.task;
};
