import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { MdModeEditOutline } from "react-icons/md";
import { BsTrashFill } from "react-icons/bs";

import { useUser } from "../../../context/user.context";
import {
  updateTaskStateFirebase,
  updateDueDateTaskFirebase,
  updateTaskPriorityFirebase,
  deleteTaskFirebase,
} from "../task.slice";
import { getYYYYMMDDString } from "../../../utils/format.utils";
import taskConstant from "../../../constant/task.constant";

export default function Task({
  id,
  content,
  isCompleted,
  dueDate,
  priority,
  onTaskEdit,
}) {
  const { userData } = useUser();
  const dispatch = useDispatch();

  const dueDateMidNight = new Date(dueDate);
  dueDateMidNight.setHours(0);
  const timeLeft = dueDateMidNight.getTime() + 86400000 - new Date().getTime();
  const normalTask = "relative h-fit p-2 border border-black rounded-lg mb-4";
  const dueTask =
    "relative h-fit p-2 border border-black rounded-lg mb-4 bg-red-200";

  const taskStyleCompleted = "line-through ml-2 h-fit";
  const taskStyleIncompleted = "ml-2 h-fit";

  function handleUpdateTaskDueDate(e) {
    const minDueDate = new Date("2000-01-01 00:00:00");
    const maxDueDate = new Date("2100-01-01 00:00:00");
    const inputDueDate = new Date(e.target.value);
    inputDueDate.setHours(0);
    if (
      minDueDate.getTime() > inputDueDate.getTime() ||
      maxDueDate.getTime() < inputDueDate.getTime()
    ) {
      toast(taskConstant.INVALID_DUE_DATE, { type: "error" });
      return;
    }
    dispatch(
      updateDueDateTaskFirebase({
        email: userData.email,
        taskid: id,
        dueDate: e.target.value,
      })
    );
  }

  function handleUpdateTaskPriority(e) {
    const priorityList = [1, 2, 3, 4];
    if (!priorityList.includes(Number(e.target.value))) {
      toast(taskConstant.INVALID_PRIORITY, { type: "error" });
      return;
    }
    dispatch(
      updateTaskPriorityFirebase({
        email: userData.email,
        taskid: id,
        priority: e.target.value,
      })
    );
  }

  return (
    <div className={timeLeft < 0 && !isCompleted ? dueTask : normalTask}>
      <div className="static">
        <div className="static w-4/5">
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
              className={
                isCompleted ? taskStyleCompleted : taskStyleIncompleted
              }
            >
              {content}
            </label>
          </div>
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex">
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
              dispatch(
                deleteTaskFirebase({ email: userData.email, taskid: id })
              )
            }
          />
        </div>
        <div className="flex max-[769px]:flex-col mt-2">
          <div className="static max-[290px]:w-[65%] max-[769px]:w-[75%] min-[770px]:w-[40%] lg:w-[40%] xl:w-[40%] border border-black rounded-md px-2 py-1 bg-white">
            <input
              type="date"
              className="w-full bg-white"
              value={getYYYYMMDDString(dueDate)}
              min="2000-01-01"
              max="2100-01-01"
              onKeyDown={(e) => e.preventDefault()}
              onChange={handleUpdateTaskDueDate}
              required
            />
          </div>
          <div className="min-[770px]:ml-2 max-[769px]:mt-2 static max-[290px]:w-[65%] max-[769px]:w-[75%] min-[770px]:w-[40%] lg:w-[40%] xl:w-[40%] border border-black rounded-md px-2 py-1 bg-white">
            <select
              className="w-full bg-white"
              value={priority || 1}
              onChange={handleUpdateTaskPriority}
            >
              <option value="1">Priority 1</option>
              <option value="2">Priority 2</option>
              <option value="3">Priority 3</option>
              <option value="4">Priority 4</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
