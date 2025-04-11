import { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Senha:", senha);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-72">
      <h1 className="text-2xl font-bold text-center mb-2">Login</h1>

      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm mb-1">
          E-mail
        </label>
        <input
          type="email"
          id="email"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="senha" className="text-sm mb-1">
          Senha
        </label>
        <input
          type="password"
          id="senha"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className=" bg-stone-600 text-white px-4 py-2 rounded-md hover:bg-slate-600"
      >
        Entrar
      </button>

      <p className="text-sm text-center mt-2">
        Não tem uma conta?{" "}
        <Link
          to="/register"
          className="text-slate-700 font-semibold hover:underline"
        >
          Registrar-se
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
