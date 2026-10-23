
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-black tracking-tight text-indigo-600">
        404
      </p>

      <h1 className="mt-5 text-2xl font-bold text-slate-900">
        Página não encontrada
      </h1>

      <p className="mt-3 max-w-md leading-7 text-slate-500">
        A página que procuras não existe ou o endereço está incorreto.
      </p>

      <Link
        to="/"
        className="mt-7 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
      >
        Voltar ao início
      </Link>
    </div>
  );
};

export default NotFound;
