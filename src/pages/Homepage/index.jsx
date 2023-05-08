import { useState } from "react";
import { MdPostAdd } from "react-icons/md";

import NavBar from "../../components/NavBar";
import Task from "./components/Task";

export default function HomePage() {
  const [taskField, setTaskField] = useState("");

  function handleTaskFieldChange(e) {
    setTaskField(e.target.value);
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
          <div className="flex justify-center">
            <input
              type="text"
              className="w-1/2 lg:w-1/3 max-[640px]:w-[65%] border-2 border-black rounded-lg px-3"
              value={taskField}
              onChange={handleTaskFieldChange}
            />
            <MdPostAdd size={35} className="ml-2 mb-1" />
          </div>
        </div>
        {/* Tasklist field */}
        <div className="absolute w-1/2 lg:w-1/3 max-[640px]:w-[80%] left-1/2 -translate-x-1/2 top-[20%]">
          <div className="absolute w-full">
            <Task id={1} content="Completed Task" isCompleted />
            <Task id={2} content="Incompleted Task" isCompleted={false} />
          </div>
        </div>
      </div>
    </NavBar>
  );
}
