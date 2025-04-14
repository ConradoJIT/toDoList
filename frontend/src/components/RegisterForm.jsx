import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");

  const [nomeErro, setNomeErro] = useState("");
  const [emailErro, setEmailErro] = useState("");
  const [senhaErro, setSenhaErro] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valido = true;

    if (nome.trim() === "") {
      setNomeErro("O nome é obrigatório.");
      valido = false;
    } else {
      setNomeErro("");
    }

    if (senha.length < 6) {
      setSenhaErro("A senha deve ter no mínimo 6 caracteres.");
      valido = false;
    } else {
      setSenhaErro("");
    }

    if (valido) {
      try {
        const response = await api.post("/Usuarios/registro", {
          nome,
          email,
          senha,
        });

        console.log("Usuário cadastrado:", response.data);
        navigate("/login");
        setNome("");
        setEmail("");
        setSenha("");
      } catch (error) {
        console.error(
          "Erro ao cadastrar usuário:",
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
      <h1 className="text-2xl font-bold text-center mb-2">Registre-se</h1>

      <div className="flex flex-col">
        <label htmlFor="nome" className="text-sm mb-1">
          Nome
        </label>
        <input
          id="nome"
          type="text"
          placeholder="Digite seu nome"
          className="border border-slate-400 outline-slate-400 px-4 py-2 rounded-md"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            setNomeErro("");
          }}
        />
        {nomeErro && <p className="text-red-500 text-sm">{nomeErro}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="text-sm mb-1">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          placeholder="Digite seu e-mail"
          className={`border px-4 py-2 rounded-md ${
            emailErro ? "border-red-500" : "border-slate-400"
          }`}
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          onInvalid={(e) => {
            e.preventDefault();
            setEmailErro("Por favor, insira um email válido.");
          }}
          onInput={() => setEmailErro("")}
        />
        {emailErro && <p className="text-red-500 text-sm">{emailErro}</p>}
      </div>

      <div className="flex flex-col">
        <label htmlFor="senha" className="text-sm mb-1">
          Senha
        </label>
        <input
          id="senha"
          type="password"
          placeholder="Digite sua senha"
          className={`border px-4 py-2 rounded-md ${
            senhaErro ? "border-red-500" : "border-slate-400"
          }`}
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setSenhaErro("");
          }}
        />
        {senhaErro && <p className="text-red-500 text-sm">{senhaErro}</p>}
      </div>

      <p className="text-sm text-center mt-2">
        Já possui cadastro?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-stone-700 font-semibold hover:underline"
        >
          Clique aqui para logar
        </button>
      </p>

      <button
        type="submit"
        className="bg-stone-600 text-white py-2 rounded hover:bg-stone-700 transition-colors"
      >
        Registrar
      </button>
    </form>
  );
}

export default RegisterForm;
