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
      dueDate: new Date().getTime(),
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
    const updateTask = { isCompleted, updatedAt: new Date().getTime() };
    await updateDoc(taskDocument, updateTask);
  }
);

export const updateTaskFirebase = createAsyncThunk(
  "task/updateTaskFirebase",
  async ({ email, taskid, content }) => {
    const taskDocument = doc(fireStore, email, taskid);
    const updateTask = {
      content,
      isCompleted: false,
      updatedAt: new Date().getTime(),
    };
    await updateDoc(taskDocument, updateTask);
  }
);

export const updateDueDateTaskFirebase = createAsyncThunk(
  "task/updateDueDateTask",
  async ({ email, taskid, dueDate }) => {
    const taskDocument = doc(fireStore, email, taskid);
    const updateTask = {
      dueDate,
      isCompleted: false,
      updatedAt: new Date().getTime(),
    };
    await updateDoc(taskDocument, updateTask);
  }
);

export const updateTaskPriorityFirebase = createAsyncThunk(
  "task/updateTaskPriority",
  async ({ email, taskid, priority }) => {
    const taskDocument = doc(fireStore, email, taskid);
    const updateTask = {
      priority,
      isCompleted: false,
      updatedAt: new Date().getTime(),
    };
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
    inProgressTasks: [],
    completedTasks: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setInProgressTasks: (state, action) => {
      state.inProgressTasks = action.payload;
    },
    setCompletedTasks: (state, action) => {
      state.completedTasks = action.payload;
    },
    resetTaskList: (state) => {
      state.tasks = [];
    },
  },
});

export const { setInProgressTasks, setCompletedTasks, resetTaskList } =
  taskSlice.actions;

export default taskSlice.reducer;

export const selectInProgessTasks = (state) => {
  return state.task.inProgressTasks;
};

export const selectCompletedTasks = (state) => {
  return state.task.completedTasks;
};
