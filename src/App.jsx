
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import AddProd from "./pages/AddProd";
import Product from "./pages/Product";
import Info from "./pages/Info";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <NavBar />

        <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AddProd" element={<AddProd />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/products/:id/info" element={<Info />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-slate-500 sm:px-6">
            Gestão de produtos
            <span className="mx-2 text-slate-300">·</span>
            React + Tailwind CSS
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
