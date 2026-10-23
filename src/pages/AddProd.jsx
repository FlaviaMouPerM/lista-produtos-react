
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetchjs";

const url = "http://localhost:3000/products";

const AddProd = () => {
  const { httpConfig, loading } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
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
    <div className="mx-auto max-w-2xl">
      <header className="mb-8">
        <Link
          to="/"
          className="text-sm font-medium text-slate-500 transition hover:text-indigo-600"
        >
          ← Voltar aos produtos
        </Link>

        <p className="mb-2 mt-6 text-sm font-semibold uppercase tracking-widest text-indigo-600">
          Inventário
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Adicionar produto
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Preenche os dados abaixo para registar um novo produto.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-slate-700"
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

            <p className="mt-2 text-xs text-slate-400">
              Escolhe um nome fácil de identificar.
            </p>
          </div>

          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Preço (€)
            </label>

            <div className="relative">
              <input
                id="price"
                type="number"
                name="price"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0.01"
                step="0.01"
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-16 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                EUR
              </span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <button
              type="submit"
              disabled={
                loading ||
                !name.trim() ||
                price === "" ||
                Number(price) <= 0
              }
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  A guardar...
                </>
              ) : (
                "Guardar produto"
              )}
            </button>

            <p className="mt-3 text-center text-xs text-slate-400">
              Confirma os dados antes de guardar.
            </p>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddProd;
