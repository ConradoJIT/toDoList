import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
  return (
    <div className="bg-slate-500 w-screen h-screen flex justify-center items-center flex-col">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;
