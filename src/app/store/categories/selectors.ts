import { createSelector } from '@ngrx/store';
import { CategoriesState } from './reducers';
import { AppState } from '../index';

export const selectCategoriesState = (state: AppState) => state.categories;

export const selectAllCategories = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.categories
);

export const selectSelectedCategory = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.selectedCategory
);
