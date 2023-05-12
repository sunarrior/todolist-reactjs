import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  emailChange,
  passwordChange,
  repeatPasswordChange,
  resetPasswordState,
  resetState,
  selectAccountInfo,
} from "../register.slice";
import { createUser } from "../register.service";

export default function RegisterForm() {
  const registerInfo = useSelector(selectAccountInfo);
  const dispatch = useDispatch();

  async function handleRegister(e) {
    try {
      e.preventDefault();
      const result = await createUser(registerInfo);
      dispatch(resetState());
      toast(result, { type: "success" });
    } catch (error) {
      dispatch(resetPasswordState());
      toast(error.message || error, { type: "error" });
    }
  }

  return (
    <div className="relative w-full h-full rounded-md">
      <div>
        <h1 className="text-slate-700 h-[80px] text-[64px]/[70px] font-lexend-deca text-center mb-[30px]">
          Sign up
        </h1>
        <p className="font-lexend-deca text-base text-center">
          Sign up and start managing your todolist!
        </p>
      </div>
      <form
        className="absolute top-[170px] left-1/2 -translate-x-1/2 font-lexend-deca"
        onSubmit={handleRegister}
      >
        <div className="mb-[23px]">
          <input
            type="email"
            className="px-4 py-2 w-[300px] max-[335px]:w-[100%] h-[45px] border rounded-xl bg-[#224957] text-white text-sm"
            placeholder="Email"
            value={registerInfo.email}
            onChange={(e) => dispatch(emailChange(e.target.value))}
            required
          />
        </div>
        <div className="mb-[23px]">
          <input
            type="password"
            className="px-4 py-2 w-[300px] max-[335px]:w-[100%] h-[45px] border rounded-xl bg-[#224957] text-white text-sm"
            placeholder="Password"
            value={registerInfo.password}
            onChange={(e) => dispatch(passwordChange(e.target.value))}
            required
          />
        </div>
        <div className="mb-[20px]">
          <input
            type="password"
            className="px-4 py-2 w-[300px] max-[335px]:w-[100%] h-[45px] border rounded-xl bg-[#224957] text-white text-sm"
            placeholder="Repeat Password"
            value={registerInfo.repeatPassword}
            onChange={(e) => dispatch(repeatPasswordChange(e.target.value))}
            required
          />
        </div>
        <div className="flex mb-[23px] ml-[6px]">
          <p className="font-medium">Already have account?</p>
          <a href="/login" className="link ml-1 font-medium">
            Login now
          </a>
        </div>
        <button
          type="submit"
          className="px-4 py2 w-[300px] max-[335px]:w-[100%] h-[45px] rounded-xl bg-[#20DF7F] hover:bg-[#2af992] font-normal text-[#224957] text-[16px]"
        >
          Register
        </button>
      </form>
    </div>
  );
}
