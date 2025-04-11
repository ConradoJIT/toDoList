import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <div className="bg-slate-500 w-screen h-screen flex justify-center items-center flex-col">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
