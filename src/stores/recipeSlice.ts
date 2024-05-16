import { StateCreator } from "zustand";
import {
  getCategories,
  getRecipe,
  getRecipes,
} from "../services/RecipeService";
import { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types";

// type Category = {};

export type RecipesSliceType = {
  categories: Categories;
  drinks: Drinks;
  selectedRecipe: Recipe;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  searchRecipes: (searchFilters: SearchFilter) => Promise<void>;
  selectRecipe: (idDrink: Drink["idDrink"]) => Promise<void>;
  closeModal: () => void;
};

export const createRecipeSlice: StateCreator<RecipesSliceType> = (set) => ({
  categories: {
    drinks: [],
  },
  drinks: {
    drinks: [],
  },
  selectedRecipe: {} as Recipe,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategories();
    set({ categories });
  },
  searchRecipes: async (searchFilters) => {
    const drinks = await getRecipes(searchFilters);
    set({ drinks });
  },
  selectRecipe: async (idDrink) => {
    const selectedRecipe = await getRecipe(idDrink);
    set({ selectedRecipe, modal: true });
  },
  closeModal: () => {
    set({ modal: false, selectedRecipe: {} as Recipe });
  },
});
