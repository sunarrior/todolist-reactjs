import AuthLayout from "../../components/AuthLayout";
import RegisterForm from "./components/RegisterForm";

export default function Register() {
  return (
    <AuthLayout>
      <div className="relative bg-[#E5E5E5] w-screen h-screen">
        <div className="w-[347px] h-[406px] top-[125px] absolute left-[49%] -translate-x-1/2">
          <RegisterForm />
        </div>
      </div>
    </AuthLayout>
  );
}
