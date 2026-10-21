
import "./index.css";
import { useState } from "react";
import { useFetch } from "./hooks/useFetchjs";

const url = "http://localhost:3000/products";

function App() {
  const { data: items, httpConfig, loading, error } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || price === "" || Number(price) <= 0) {
      return;
    }

    const product = {
      name: name.trim(),
      price: Number(price),
    };

    httpConfig(product, "POST");

    setName("");
    setPrice("");
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12 text-slate-800">
      <div className="mx-auto max-w-3xl">

        {/* Cabeçalho */}
        <header className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-3xl text-white shadow-lg shadow-indigo-200">
            🛍
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Lista de Produtos
          </h1>

          <p className="mt-3 text-slate-500">
            Gere e organiza os teus produtos num só lugar.
          </p>
        </header>

        {/* Lista de produtos */}
        <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Os teus produtos
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {items?.length ?? 0} produtos registados
              </p>
            </div>

            <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
              Inventário
            </span>
          </div>

          {loading && (
            <div className="flex items-center justify-center gap-3 px-6 py-10 text-slate-500">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
              <p>A carregar dados...</p>
            </div>
          )}

          {error && (
            <p
              role="alert"
              className="m-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {!loading && !error && (
            <>
              {items && items.length > 0 ? (
                <ul className="divide-y divide-slate-100">
                  {items.map((prod) => (
                    <li
                      key={prod.id}
                      className="flex items-center justify-between gap-4 px-6 py-4 transition hover:bg-slate-50"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 font-semibold text-indigo-600">
                          {prod.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-medium text-slate-800">
                            {prod.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            ID: {prod.id}
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 rounded-lg bg-emerald-50 px-3 py-2 font-semibold text-emerald-700">
                        {Number(prod.price).toLocaleString("pt-PT", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-6 py-12 text-center">
                  <div className="mb-3 text-4xl">📦</div>
                  <h3 className="font-semibold text-slate-800">
                    Ainda não tens produtos
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Utiliza o formulário abaixo para adicionar o primeiro.
                  </p>
                </div>
              )}
            </>
          )}
        </section>

        {/* Formulário */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Adicionar produto
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Preenche os campos para registar um novo produto.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Nome do produto
              </label>

              <input
                id="name"
                type="text"
                name="name"
                placeholder="Ex.: Teclado mecânico"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Preço (€)
              </label>

              <div className="relative">
                <input
                  id="price"
                  type="number"
                  name="price"
                  placeholder="0,00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0.01"
                  step="0.01"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                  EUR
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !name.trim() || price === "" || Number(price) <= 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  A guardar...
                </>
              ) : (
                <>
                  <span className="text-xl leading-none">+</span>
                  Adicionar produto
                </>
              )}
            </button>
          </form>
        </section>

        <footer className="mt-8 text-center text-xs text-slate-400">
          Gestão de produtos · React + Tailwind CSS
        </footer>
      </div>
    </main>
  );
}

export default App;
