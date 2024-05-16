import axios from "axios";
import {
  CategoriesAPIResponseSchema,
  DrinksAPIResponse,
} from "../utils/recipes-schema";
import { Drink, SearchFilter } from "../types";

export async function getCategories() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
  const { data } = await axios(url);
  const result = CategoriesAPIResponseSchema.safeParse(data);
  if (result) {
    return result.data;
  }
}
export async function getRecipes(searchFilters: SearchFilter) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${searchFilters.category}&i=${searchFilters.ingredient}`;

  const { data } = await axios(url);

  const result = DrinksAPIResponse.safeParse(data);
  if (result) {
    return result.data;
  }
}
export async function getRecipe(idDrink: Drink["idDrink"]) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
  const { data } = await axios(url);
  console.log(data);

  //  const result = DrinksAPIResponse.safeParse(data);
  //  if (result) {
  //    return result.data;
  //  }
}
