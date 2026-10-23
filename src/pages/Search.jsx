import { useSearchParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetchjs";

const url = "http://localhost:3000/products";

const normalize = (s) =>
  String(s ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";

  const { data, loading, error } = useFetch(url);

  const q = normalize(query);
  const items = data
    ? data.filter((p) =>
        [p.name, p.category, p.description, p.color].some((field) =>
          normalize(field).includes(q)
        )
      )
    : null;

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Catálogo
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Resultados da pesquisa
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {query
            ? `Resultados para "${query}"`
            : "Pesquisa produtos no catálogo."}
        </p>
      </header>

      {loading && (
        <p className="rounded-xl bg-slate-50 px-5 py-8 text-center text-slate-600">
          A carregar produtos...
        </p>
      )}

      {!loading && error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-5 py-6 text-center text-red-700"
        >
          Não foi possível carregar os produtos. Tenta novamente.
        </div>
      )}

      {!loading && !error && items?.length > 0 && (
        <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-4 px-5 py-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-600">
                  {item.name?.charAt(0).toUpperCase() ?? "?"}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-800">
                    {item.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    ID: {item.id}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <span className="whitespace-nowrap rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
                  {Number(item.price).toLocaleString("pt-PT", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </span>
                <Link
                  to={`/products/${item.id}`}
                  className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  Detalhes →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && items !== null && items.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
          <div className="mb-4 text-4xl">📦</div>
          <h2 className="text-lg font-semibold text-slate-800">
            Nenhum produto encontrado
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Experimenta pesquisar com outro nome.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
          >
            Ver todos os produtos
          </Link>
        </div>
      )}
    </main>
  );
};

export default Search;