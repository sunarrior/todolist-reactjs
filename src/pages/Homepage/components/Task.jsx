/* eslint-disable jsx-a11y/label-has-associated-control */
import { MdModeEditOutline } from "react-icons/md";
import { BsTrashFill } from "react-icons/bs";

export default function Task({ id, content, isCompleted }) {
  const taskStyleCompleted = "line-through ml-2";
  const taskStyleIncompleted = "ml-2";

  return (
    <div className="relative h-12 p-2 border border-black rounded-lg mb-4">
      <div className="absolute left-2">
        <input
          id={id}
          type="checkbox"
          name="task"
          checked={isCompleted}
          className="w-4 h-4 mt-[6px]"
        />
        <label
          htmlFor={id}
          className={isCompleted ? taskStyleCompleted : taskStyleIncompleted}
        >
          {content}
        </label>
      </div>
      <div className="absolute right-2 top-3 flex">
        <MdModeEditOutline size={20} color="orange" className="mr-2" />
        <BsTrashFill size={20} color="red" />
      </div>
    </div>
  );
}
