import { StateCreator } from "zustand";
import {
  getCategories,
  getRecipe,
  getRecipes,
} from "../services/RecipeService";
import { Categories, Drink, Drinks, SearchFilter } from "../types";

// type Category = {};

export type RecipesSliceType = {
  categories: Categories;
  drinks: Drinks;
  fetchCategories: () => Promise<void>;
  searchRecipes: (searchFilters: SearchFilter) => Promise<void>;
  selectRecipe: (idDrink: Drink["idDrink"]) => Promise<void>;
};

export const createRecipeSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: {
    drinks: [],
  },
  drinks: {
    drinks: [],
  },
  fetchCategories: async () => {
    const categories = await getCategories();
    set({ categories });
  },
  searchRecipes: async (searchFilters) => {
    const drinks = await getRecipes(searchFilters);
    set({ drinks });
  },
  selectRecipe: async (idDrink) => {
    await getRecipe(idDrink);
  },
});
