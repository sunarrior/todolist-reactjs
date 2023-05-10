import { useDispatch } from "react-redux";
import { MdModeEditOutline } from "react-icons/md";
import { BsTrashFill } from "react-icons/bs";

import { useUser } from "../../../context/user.context";
import { updateTaskStateFirebase, deleteTaskFirebase } from "../task.slice";

export default function Task({ id, content, isCompleted, onTaskEdit }) {
  const { userData } = useUser();
  const dispatch = useDispatch();

  const taskStyleCompleted = "line-through ml-2";
  const taskStyleIncompleted = "ml-2";

  return (
    <div className="relative h-12 p-2 border border-black rounded-lg mb-4">
      <div className="absolute left-2">
        <div className="flex items-center mt-[3px]">
          <input
            id={id}
            type="checkbox"
            name="task"
            checked={isCompleted}
            className="w-4 h-4 rounded-md"
            onChange={() =>
              dispatch(
                updateTaskStateFirebase({
                  email: userData.email,
                  taskid: id,
                  isCompleted: !isCompleted,
                })
              )
            }
          />
          <label
            htmlFor={id}
            className={isCompleted ? taskStyleCompleted : taskStyleIncompleted}
          >
            {content}
          </label>
        </div>
      </div>
      <div className="absolute right-2 top-3 flex">
        <MdModeEditOutline
          size={20}
          color="orange"
          className="mr-2"
          onClick={() => onTaskEdit(id)}
        />
        <BsTrashFill
          size={20}
          color="red"
          onClick={() =>
            dispatch(deleteTaskFirebase({ email: userData.email, taskid: id }))
          }
        />
      </div>
    </div>
  );
}
