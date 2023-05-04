export default function RegisterForm() {
  return (
    <div className="relative w-full h-full rounded-md">
      <div>
        <h1 className="text-slate-700 h-[80px] text-[64px]/[70px] font-lexend-deca text-center mb-[33px]">
          Sign up
        </h1>
        <p className="font-lexend-deca text-base text-center">
          Sign up and start managing your todolist!
        </p>
      </div>
      <form className="absolute top-[170px] left-[24px] font-lexend-deca">
        <div className="mb-[23px]">
          <input
            type="text"
            className="px-4 py-2 w-[300px] h-[45px] border rounded-xl bg-[#224957] text-white text-sm"
            placeholder="Email"
          />
        </div>
        <div className="mb-[13px]">
          <input
            type="password"
            className="px-4 py-2 w-[300px] h-[45px] border rounded-xl bg-[#224957] text-white text-sm"
            placeholder="Password"
          />
        </div>
        <div className="flex mb-[23px] ml-[6px]">
          <p className="font-medium">Already have account?</p>
          <a href="/" className="link ml-1 font-medium">
            Login now
          </a>
        </div>
        <button
          type="submit"
          className="px-4 py2 w-[300px] h-[45px] rounded-xl bg-[#20DF7F] hover:bg-[#2af992] font-normal text-[#224957] text-[16px]"
        >
          Register
        </button>
      </form>
    </div>
  );
}
