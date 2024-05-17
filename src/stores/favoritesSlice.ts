import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { toast } from "react-toastify";

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe["idDrink"]) => boolean;
  loadFromLocalStorage: () => void;
};

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (
  set,
  get
) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (get().favoriteExists(recipe.idDrink)) {
      set((state) => ({
        favorites: [
          ...state.favorites.filter(
            (favorite) => favorite.idDrink !== recipe.idDrink
          ),
        ],
      }));
      toast.error(`${recipe.strDrink} eliminada de favoritos`);
    } else {
      set((state) => ({ favorites: [...state.favorites, recipe] }));
      toast.success(`${recipe.strDrink} agregada a favoritos`);
    }
    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },
  favoriteExists: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id);
  },
  loadFromLocalStorage: () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      set({ favorites: JSON.parse(storedFavorites) });
    }
  },
});
