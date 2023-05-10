import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { collection, query, onSnapshot } from "firebase/firestore";
import { MdPostAdd } from "react-icons/md";

import { fireStore } from "../../config/firebase.config";
import { useUser } from "../../context/user.context";
import {
  setTaskList,
  addTaskFirebase,
  selectTaskList,
  resetTaskList,
} from "./task.slice";
import NavBar from "../../components/NavBar";
import Spinner from "../../components/Spinner";
import Task from "./components/Task";
import EditTask from "./components/EditTask";

export default function HomePage() {
  const { userData } = useUser();
  const taskList = useSelector(selectTaskList);
  const dispatch = useDispatch();
  const [taskField, setTaskField] = useState("");
  const [currentEditTask, setCurrentEditTask] = useState(0);

  useEffect(() => {
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
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        });
      });
      taskListFetch.sort((t1, t2) => {
        return t2.createdAt - t1.createdAt;
      });
      dispatch(setTaskList(taskListFetch));
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
    dispatch(addTaskFirebase({ email: userData.email, content: taskField }));
    setTaskField("");
  }

  return (
    <NavBar>
      <div className="relative w-screen h-screen">
        {/* Todolist header and input task field */}
        <div className="absolute w-full top-5">
          <div className="flex justify-center">
            <p className="font-bold text-3xl">TODO LIST</p>
          </div>
        </div>
        <div className="absolute w-full top-20 left-5">
          <form className="flex justify-center" onSubmit={handleTaskListAdd}>
            <input
              type="text"
              className="w-1/2 lg:w-1/3 max-[640px]:w-[65%] border-2 border-black rounded-lg px-3"
              value={taskField}
              placeholder="What you want to do?"
              onChange={handleTaskFieldChange}
            />
            <button type="submit">
              <MdPostAdd size={35} className="ml-2 mb-1" />
            </button>
          </form>
        </div>
        {/* Tasklist field */}
        <div className="absolute w-1/2 lg:w-1/3 max-[640px]:w-[80%] left-1/2 -translate-x-1/2 top-[20%]">
          <div className="w-full">
            {taskList.length <= 0 && (
              <div className="h-screen">
                <div className="h-1/5">
                  <Spinner />
                </div>
              </div>
            )}
            {taskList.length > 0 &&
              taskList.map((task) => {
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
                    onTaskEdit={setCurrentEditTask}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </NavBar>
  );
}
