import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { collection, query, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import { MdPostAdd } from "react-icons/md";

import { fireStore } from "../../config/firebase.config";
import { useUser } from "../../context/user.context";
import {
  setInProgressTasks,
  setCompletedTasks,
  addTaskFirebase,
  selectInProgessTasks,
  selectCompletedTasks,
  resetTaskList,
} from "./task.slice";
import NavBar from "../../components/NavBar";
import Spinner from "../../components/Spinner16x16";
import Task from "./components/Task";
import EditTask from "./components/EditTask";
import taskConstant from "../../constant/task.constant";

export default function HomePage() {
  const { userData } = useUser();
  const inProgressTasks = useSelector(selectInProgessTasks);
  const completedTasks = useSelector(selectCompletedTasks);
  const dispatch = useDispatch();
  const [taskField, setTaskField] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [currentEditTask, setCurrentEditTask] = useState(0);

  useEffect(() => {
    setIsFetching(true);
    if (!userData?.email) {
      return setIsFetching(false);
    }
    const taskListCollection = collection(fireStore, userData.email);
    const taskQuery = query(taskListCollection);
    const unsubscribe = onSnapshot(taskQuery, (queryDocSnapshot) => {
      const taskListFetch = [];
      queryDocSnapshot.forEach((doc) => {
        const data = doc.data();
        taskListFetch.push({
          id: doc.id,
          content: data.content,
          isCompleted: data.isCompleted,
          dueDate: data.dueDate,
          priority: data.priority,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      });
      taskListFetch.sort((t1, t2) => {
        return t2.createdAt - t1.createdAt;
      });
      taskListFetch.sort((t1, t2) => {
        return t2.priority - t1.priority;
      });
      const tmpInProgressTasks = taskListFetch.filter(
        (task) => !task.isCompleted
      );
      const tmpCompletedTasks = taskListFetch.filter(
        (task) => task.isCompleted
      );
      dispatch(setInProgressTasks(tmpInProgressTasks));
      dispatch(setCompletedTasks(tmpCompletedTasks));
      setIsFetching(false);
    });
    return () => {
      unsubscribe();
      dispatch(resetTaskList());
    };
  }, [userData, dispatch]);

  function handleTaskFieldChange(e) {
    setTaskField(e.target.value);
  }

  function handleTaskListAdd(e) {
    e.preventDefault();
    if (taskField.localeCompare("") === 0) {
      toast(taskConstant.EMPTY_TASK_FIELD, { type: "error" });
      return;
    }
    dispatch(addTaskFirebase({ email: userData.email, content: taskField }));
    setTaskField("");
  }

  return (
    <NavBar>
      <div className="relative w-full h-full">
        {/* Todolist header and input task field */}
        <div className="absolute w-full top-5 -translate-x-3 max-[640px]:left-1/2 max-[640px]:-translate-x-1/2">
          <div className="flex justify-around">
            <p className="font-bold text-3xl">TODO LIST</p>
          </div>
        </div>
        <div className="absolute w-full top-20 left-1/2 -translate-x-1/2">
          <form className="flex justify-center" onSubmit={handleTaskListAdd}>
            <input
              type="text"
              className="w-1/2 lg:w-1/3 max-[640px]:w-[65%] border-2 border-black rounded-lg px-3"
              value={taskField}
              placeholder="What you want to do?"
              onChange={handleTaskFieldChange}
              required
            />
            <button type="submit">
              <MdPostAdd size={35} className="ml-2 mb-1" />
            </button>
          </form>
        </div>
        {/* Tasklist field */}
        <div className="flex max-[640px]:flex-col min-[641px]:justify-around h-1/2 w-full translate-y-40">
          <div className="w-1/2 max-[640px]:w-[80%] min-[641px]:w-[45%] lg:w-[45%] max-[640px]:translate-x-[11%]">
            <div className="w-full h-10 border border-black rounded-lg bg-yellow-300 mb-3">
              <p className="w-full text-center mt-2 font-bold">In Progess</p>
            </div>
            <div className="w-full">
              {isFetching && (
                <div className="h-screen">
                  <div className="h-1/5">
                    <Spinner />
                  </div>
                </div>
              )}
              {inProgressTasks.length > 0 &&
                inProgressTasks.map((task) => {
                  if (currentEditTask === task.id) {
                    return (
                      <EditTask
                        key={task.id}
                        id={task.id}
                        content={task.content}
                        onCancelEdit={setCurrentEditTask}
                      />
                    );
                  }
                  return (
                    <Task
                      key={task.id}
                      id={task.id}
                      content={task.content}
                      isCompleted={task.isCompleted}
                      dueDate={task.dueDate}
                      priority={task.priority}
                      onTaskEdit={setCurrentEditTask}
                    />
                  );
                })}
            </div>
          </div>
          <div className="w-1/2 max-[640px]:w-[80%] min-[641px]:w-[45%] lg:w-[45%] max-[640px]:translate-x-[11%]">
            <div className="w-full h-10 border border-black rounded-lg bg-green-300 mb-3">
              <p className="w-full text-center mt-2 font-bold">Completed</p>
            </div>
            <div className="w-full">
              {isFetching && (
                <div className="h-screen">
                  <div className="h-1/5">
                    <Spinner />
                  </div>
                </div>
              )}
              {completedTasks.length > 0 &&
                completedTasks.map((task) => {
                  if (currentEditTask === task.id) {
                    return (
                      <EditTask
                        key={task.id}
                        id={task.id}
                        content={task.content}
                        onCancelEdit={setCurrentEditTask}
                      />
                    );
                  }
                  return (
                    <Task
                      key={task.id}
                      id={task.id}
                      content={task.content}
                      isCompleted={task.isCompleted}
                      dueDate={task.dueDate}
                      priority={task.priority}
                      onTaskEdit={setCurrentEditTask}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  );
}
