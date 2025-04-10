import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

function PageNotFound() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-100 px-4 text-center">
      <div className="flex flex-col items-center gap-6 bg-white shadow-lg p-10 rounded-2xl max-w-md">
        <AlertTriangle className="text-red-500 w-16 h-16" />
        <h1 className="text-4xl font-bold text-red-600">404</h1>
        <p className="text-lg text-gray-600">
          Opa! A página que você tentou acessar não existe ou foi movida.
        </p>
        <button
          onClick={goToLogin}
          className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-md font-semibold transition duration-200"
        >
          Voltar para o Login
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
