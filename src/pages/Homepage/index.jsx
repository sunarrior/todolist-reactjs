import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdPostAdd } from "react-icons/md";

import { taskListAdd, selectTaskList } from "./task.slice";
import NavBar from "../../components/NavBar";
import Task from "./components/Task";
import EditTask from "./components/EditTask";

export default function HomePage() {
  const taskList = useSelector(selectTaskList);
  const dispatch = useDispatch();
  const [taskField, setTaskField] = useState("");
  const [currentEditTask, setCurrentEditTask] = useState(0);

  function handleTaskFieldChange(e) {
    setTaskField(e.target.value);
  }

  function handleTaskListAdd(e) {
    e.preventDefault();
    dispatch(
      taskListAdd({
        id: taskList.length + 1,
        content: taskField,
        isCompleted: false,
      })
    );
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
          <div className="absolute w-full">
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
