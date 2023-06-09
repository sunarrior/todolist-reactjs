import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

import { useUser } from "../../../context/user.context";
import { updateTaskFirebase } from "../task.slice";
import taskConstant from "../../../constant/task.constant";

export default function EditTask({ id, content, onCancelEdit }) {
  const { userData } = useUser();
  const dispatch = useDispatch();
  const [newContent, setNewContent] = useState(content);

  function handleEditTask() {
    if (newContent.localeCompare("") === 0) {
      toast(taskConstant.EMPTY_TASK_FIELD, { type: "error" });
      return;
    }
    dispatch(
      updateTaskFirebase({
        taskid: id,
        email: userData.email,
        content: newContent,
      })
    );
    onCancelEdit(0);
  }

  return (
    <div className="relative h-12 p-2 border border-black rounded-lg mb-4">
      <div className="absolute left-2 w-[95%]">
        <div className="flex items-center mt-[3px]">
          <input
            id={id}
            type="text"
            name="task"
            placeholder="what you want to do"
            value={newContent}
            className="px-2 w-3/4 border border-black rounded-md"
            onChange={(e) => setNewContent(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="absolute right-2 top-3 flex">
        <BsCheckLg size={23} color="green" onClick={() => handleEditTask()} />
        <AiOutlineClose
          size={23}
          color="red"
          className="ml-1"
          onClick={() => onCancelEdit(0)}
        />
      </div>
    </div>
  );
}
