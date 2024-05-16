import { useEffect, useMemo, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

const Header = () => {
  const { fetchCategories, categories, searchRecipes } = useAppStore();

  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);

  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchFilters({ ...searchFilters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(searchFilters).includes("")) {
      console.log("Todos los campos son obligatorios");
      return;
    }
    searchRecipes(searchFilters);
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <header className={isHome ? "bg-header" : "bg-slate-800"}>
      <div className=" mx-auto container px-5 py-16">
        <div className=" flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="logotipo" />
          </div>
          <nav className=" flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? " text-orange-500 uppercase font-bold transition-all"
                  : " text-white uppercase font-bold transition-all"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                isActive
                  ? " text-orange-500 uppercase font-bold transition-all"
                  : " text-white uppercase font-bold transition-all"
              }
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form
            className=" md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow-lg space-y-6"
            onSubmit={handleSubmit}
          >
            <div className=" space-y-4">
              <label
                htmlFor="ingredient"
                className=" block text-white uppercase font-extrabold text-lg"
              >
                Nombre o Ingredientes
              </label>
              <input
                type="text"
                id="ingredient"
                name="ingredient"
                className="p-3 w-full rounded-lg focus:outline-none"
                placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café"
                value={searchFilters.ingredient}
                onChange={handleChange}
              />
            </div>
            <div className=" space-y-4">
              <label
                htmlFor="category"
                className=" block text-white uppercase font-extrabold text-lg"
              >
                Categoriá
              </label>
              <select
                id="category"
                name="category"
                className="p-3 w-full rounded-lg focus:outline-none"
                onChange={handleChange}
                value={searchFilters.category}
              >
                <option value="">--Seleccione--</option>
                {categories.drinks.map((categorie) => (
                  <option
                    key={categorie.strCategory}
                    value={categorie.strCategory}
                  >
                    {categorie.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Buscar Recetas"
              className="cursor-pointer bg-orange-800 hover:bg-orange-900 uppercase rounded-lg  text-white font-extrabold w-full p-2"
            />
          </form>
        )}
      </div>
    </header>
  );
};

export default Header;
