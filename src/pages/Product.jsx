
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetchjs";

const Product = () => {
  const { id } = useParams();
  const url = `http://localhost:3000/products/${id}`;

  const {
    data: product,
    loading,
    error,
  } = useFetch(url);

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        to="/"
        className="text-sm font-medium text-slate-500 transition hover:text-indigo-600"
      >
        ← Voltar aos produtos
      </Link>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {loading && (
          <p className="py-8 text-center text-sm text-slate-500">
            A carregar produto...
          </p>
        )}

        {error && (
          <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
            Não foi possível carregar o produto.
          </p>
        )}

        {!loading && !error && product && (
          <>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl font-bold text-indigo-600">
              {product.name.charAt(0).toUpperCase()}
            </div>

            <p className="mb-2 mt-6 text-sm font-medium text-indigo-600">
              Produto #{product.id}
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {product.name}
            </h1>

            <div className="mt-6 rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Preço</p>
              <p className="mt-1 text-3xl font-bold text-slate-900">
                {Number(product.price).toLocaleString("pt-PT", {
                  style: "currency",
                  currency: "EUR",
                })}
              </p>
            </div>

            <Link
              to={`/products/${product.id}/info`}
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
            >
              Mais informações
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Product;
