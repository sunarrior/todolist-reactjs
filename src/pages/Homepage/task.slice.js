import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { fireStore } from "../../config/firebase.config";

export const addTaskFirebase = createAsyncThunk(
  "task/addTaskFirebase",
  async ({ email, content }) => {
    const taskListCollection = collection(fireStore, email);
    const newTask = {
      content,
      isCompleted: false,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    await addDoc(taskListCollection, newTask);
  }
);

export const updateTaskStateFirebase = createAsyncThunk(
  "task/updateTaskStateFirebase",
  async ({ email, taskid, isCompleted }) => {
    const taskDocument = doc(fireStore, email, taskid);
    const updateTask = { isCompleted, updatedAt: new Date() };
    await updateDoc(taskDocument, updateTask);
  }
);

export const updateTaskFirebase = createAsyncThunk(
  "task/updateTaskFirebase",
  async ({ email, taskid, content }) => {
    const taskDocument = doc(fireStore, email, taskid);
    const updateTask = { content, isCompleted: false, updatedAt: new Date() };
    await updateDoc(taskDocument, updateTask);
  }
);

export const deleteTaskFirebase = createAsyncThunk(
  "task/deleteTaskFirebase",
  async ({ email, taskid }) => {
    const taskDocument = doc(fireStore, email, taskid);
    await deleteDoc(taskDocument);
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setTaskList: (state, action) => {
      state.tasks = action.payload;
    },
    resetTaskList: (state) => {
      state.tasks = [];
    },
  },
});

export const { setTaskList, resetTaskList } = taskSlice.actions;

export default taskSlice.reducer;

export const selectTaskList = (state) => {
  return state.task.tasks;
};
