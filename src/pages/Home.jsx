
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetchjs";
import SearchForm from "../components/SearchForm";

const url = "http://localhost:3000/products";

const Home = () => {
  const { data: items, loading, error } = useFetch(url);

  return (
    <div className="space-y-8">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Painel de controlo
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Os teus produtos
          </h1>

          <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
            Consulta e gere o teu inventário num só lugar.
          </p>
        </div>
        <div className="mb-8">
        <SearchForm />
      </div>

        <Link
          to="/AddProd"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
        >
          <span className="text-lg">+</span>
          Novo produto
        </Link>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold text-slate-900">
              Inventário
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Produtos registados na aplicação
            </p>
          </div>

          <span className="rounded-xl bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700">
            {items?.length ?? 0} produtos
          </span>
        </div>

        <div className="mt-6 border-t border-slate-100" />

        {loading && (
          <div className="flex items-center justify-center gap-3 py-12 text-sm text-slate-500">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
            A carregar produtos...
          </div>
        )}

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            Não foi possível carregar os produtos. Tenta novamente.
          </p>
        )}

        {!loading && !error && (
          <>
            {items?.length > 0 ? (
              <ul className="mt-2 divide-y divide-slate-100">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col gap-4 py-5 transition sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-600">
                        {item.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-slate-800">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                          Referência #{item.id}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <p className="text-lg font-bold text-slate-900">
                        {Number(item.price).toLocaleString("pt-PT", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </p>

                      <Link
                        to={`/products/${item.id}`}
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                      >
                        Detalhes
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                  📦
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">
                  Ainda não tens produtos
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Adiciona o teu primeiro produto para começar a organizar o inventário.
                </p>

                <Link
                  to="/AddProd"
                  className="mt-5 inline-flex rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Adicionar primeiro produto
                </Link>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
