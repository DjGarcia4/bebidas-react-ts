import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { RecipesSliceType, createRecipeSlice } from "./recipeSlice";
import { FavoritesSliceType, createFavoritesSlice } from "./favoritesSlice";

export const useAppStore = create<RecipesSliceType & FavoritesSliceType>()(
  devtools((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavoritesSlice(...a),
  }))
);
