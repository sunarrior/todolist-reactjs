import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { emailChange, passwordChange, selectAccountInfo } from "../login.slice";
import { authUser } from "../login.service";

export default function RegisterForm() {
  const loginInfo = useSelector(selectAccountInfo);
  const dispatch = useDispatch();

  async function handleRegister(e) {
    try {
      e.preventDefault();
      await authUser(loginInfo);
    } catch (error) {
      toast(error.message || error, { type: "error" });
    }
  }

  return (
    <div className="relative w-full h-full rounded-md">
      <div>
        <h1 className="text-slate-700 h-[80px] text-[64px]/[70px] font-lexend-deca text-center mb-[30px]">
          Sign in
        </h1>
        <p className="font-lexend-deca text-base text-center">
          Sign in and start managing your todolist!
        </p>
      </div>
      <form
        className="absolute top-[170px] left-[24px] font-lexend-deca"
        onSubmit={handleRegister}
      >
        <div className="mb-[23px]">
          <input
            type="email"
            className="px-4 py-2 w-[300px] h-[45px] border rounded-xl bg-[#224957] text-white text-sm"
            placeholder="Email"
            value={loginInfo.email}
            onChange={(e) => dispatch(emailChange(e.target.value))}
            required
          />
        </div>
        <div className="mb-[20px]">
          <input
            type="password"
            className="px-4 py-2 w-[300px] h-[45px] border rounded-xl bg-[#224957] text-white text-sm"
            placeholder="Password"
            value={loginInfo.password}
            onChange={(e) => dispatch(passwordChange(e.target.value))}
            required
          />
        </div>
        <div className="flex mb-[23px] ml-[6px]">
          <p className="font-medium">Dont have account?</p>
          <a href="/register" className="link ml-1 font-medium">
            Register now
          </a>
        </div>
        <button
          type="submit"
          className="px-4 py2 w-[300px] h-[45px] rounded-xl bg-[#20DF7F] hover:bg-[#2af992] font-normal text-[#224957] text-[16px]"
        >
          Login
        </button>
      </form>
    </div>
  );
}
