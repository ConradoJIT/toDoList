import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Registre-se
        </h1>
        <RegisterForm></RegisterForm>
      </div>
    </div>
  );
}

export default RegisterPage;
