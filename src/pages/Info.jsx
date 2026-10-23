
import { Link, useParams } from "react-router-dom";

const Info = () => {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        to={`/products/${id}`}
        className="text-sm font-medium text-slate-500 transition hover:text-indigo-600"
      >
        ← Voltar ao produto
      </Link>

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
          ℹ
        </div>

        <p className="mb-2 mt-6 text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Informações
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Detalhes adicionais
        </h1>

        <p className="mt-3 leading-7 text-slate-500">
          Estás a consultar as informações do produto com o ID{" "}
          <span className="font-semibold text-slate-800">{id}</span>.
        </p>

        <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-sm text-slate-500">
            Identificador do produto
          </p>
          <p className="mt-1 font-semibold text-slate-900">#{id}</p>
        </div>
      </section>
    </div>
  );
};

export default Info;
