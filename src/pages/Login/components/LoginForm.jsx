import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { useUser } from "../../../context/user.context";
import {
  emailChange,
  passwordChange,
  resetPasswordState,
  resetState,
  selectAccountInfo,
} from "../login.slice";
import { authUser } from "../login.service";
import Spinner from "../../../components/Spinner6x6";
import loginConstant from "../../../constant/login.constant";

export default function LoginForm() {
  const { userData, setIsLoggedIn, setUserData } = useUser();
  const loginInfo = useSelector(selectAccountInfo);
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleLogin(e) {
    try {
      e.preventDefault();
      if (!loginInfo.email && !loginInfo.password) {
        throw new Error(loginConstant.MISSING_INFORMATION);
      }
      setIsProcessing(true);
      const result = await authUser(loginInfo);
      localStorage.setItem("_uobj", JSON.stringify(result));
      dispatch(resetState());
      setUserData({ ...userData, email: result.email });
      setIsLoggedIn(true);
      setIsProcessing(false);
    } catch (error) {
      dispatch(resetPasswordState());
      setIsProcessing(false);
      toast(error.message || error, { type: "error" });
    }
  }

  return (
    <div className="relative w-full h-full rounded-md text-center">
      <div>
        <h1 className="text-slate-700 h-[80px] text-[64px]/[70px] font-lexend-deca text-center mb-[30px]">
          Sign in
        </h1>
        <p className="font-lexend-deca text-base text-center">
          Sign in and start managing your todolist!
        </p>
      </div>
      <form
        className="absolute top-[170px] left-1/2 -translate-x-1/2 font-lexend-deca"
        onSubmit={handleLogin}
      >
        <div className="mb-[23px]">
          <input
            type="email"
            className="px-4 py-2 w-[300px] max-[335px]:w-[100%] h-[45px] border rounded-xl bg-[#224957] disabled:bg-[#31687c] text-white text-sm"
            placeholder="Email"
            value={loginInfo.email}
            onChange={(e) => dispatch(emailChange(e.target.value))}
            required
            disabled={isProcessing}
          />
        </div>
        <div className="mb-[20px]">
          <input
            type="password"
            className="px-4 py-2 w-[300px] max-[335px]:w-[100%] h-[45px] border rounded-xl bg-[#224957] disabled:bg-[#31687c] text-white text-sm"
            placeholder="Password"
            value={loginInfo.password}
            onChange={(e) => dispatch(passwordChange(e.target.value))}
            required
            disabled={isProcessing}
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
          className="px-4 py2 w-[300px] max-[335px]:w-[80%] h-[45px] rounded-xl bg-[#20DF7F] hover:bg-[#2af992] disabled:bg-[#1cca73] font-normal text-[#224957] text-[16px]"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <div className="w-full h-full">
              <Spinner />
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
