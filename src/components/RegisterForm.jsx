import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");

  const [nomeErro, setNomeErro] = useState("");
  const [emailErro, setEmailErro] = useState("");
  const [senhaErro, setSenhaErro] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
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
      console.log("Formulário válido:", { nome, email, senha });
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col"
    >
      <input
        type="text"
        placeholder="Digite o nome"
        className="border border-slate-400 outline-slate-400 px-4 py-2 rounded-md"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      {nomeErro && <p className="text-red-500 text-sm">{nomeErro}</p>}
      <input
        type="email"
        placeholder="Digite o email"
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

      <input
        type="password"
        placeholder="Digite a senha"
        className={`border px-4 py-2 rounded-md ${
          senhaErro ? "border-red-500" : "border-slate-400"
        }`}
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      {senhaErro && <p className="text-red-500 text-sm">{senhaErro}</p>}

      <button
        className="text-sm text-slate-500 font-bold text-right"
        onClick={() => navigate("/")} //ALTERAR PARA A ROTA DE LOGIN
        type="button"
      >
        Ja possui cadastro? Clique aqui para logar
      </button>

      <button
        type="submit"
        className="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-600"
      >
        Registrar
      </button>
    </form>
  );
}

export default RegisterForm;
