
import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-indigo-50 text-indigo-700"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

const NavBar = () => {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-xl text-white shadow-sm">
            P
          </div>

          <div>
            <p className="font-bold tracking-tight text-slate-900">
              ProductHub
            </p>
            <p className="text-xs text-slate-500">
              Gestão de inventário
            </p>
          </div>
        </NavLink>

        <div className="flex items-center gap-2">
          <NavLink to="/" end className={linkStyle}>
            Produtos
          </NavLink>

          <NavLink to="/AddProd" className={linkStyle}>
            + Adicionar produto
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
