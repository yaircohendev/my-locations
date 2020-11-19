import * as fromCategories from './categories/reducers';

import { ActionReducerMap } from '@ngrx/store';
import { CategoriesState } from './categories/reducers';

export interface AppState {
  categories: CategoriesState;
}

export const reducers: ActionReducerMap<AppState> = {
  categories: fromCategories.categoriesReducer,
};
