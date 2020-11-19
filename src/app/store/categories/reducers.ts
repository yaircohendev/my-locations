import * as CategoriesActions from './actions';
import { createReducer, on } from '@ngrx/store';

export interface CategoriesState {
  categories: string[];
  selectedCategory: string;
}

export const initialState: CategoriesState = {
  categories: [],
  selectedCategory: '',
};

export const categoriesReducer = createReducer(
  initialState,
  on(CategoriesActions.addCategory, (state, { payload }) => ({
    ...state,
    categories: [...state.categories, payload],
  })),
  on(CategoriesActions.addCategories, (state, { payload }) => ({
    ...state,
    categories: [...state.categories, ...payload],
  })),
  on(CategoriesActions.updateCategories, (state, { payload }) => ({
    ...state,
    categories: [...payload],
  })),
  on(CategoriesActions.updateSelectedCategory, (state, { payload }) => ({
    ...state,
    selectedCategory: payload,
  }))
);
