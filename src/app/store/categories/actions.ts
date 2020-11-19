import { createAction, props } from '@ngrx/store';

export const beginAddCategory = createAction(
  '[Category] begin add',
  props<{ payload: string }>()
);

export const addCategory = createAction(
  '[Category] add',
  props<{ payload: string }>()
);

export const addCategories = createAction(
  '[Categories] add categories',
  props<{ payload: string[] }>()
);

export const beginUpdateCategory = createAction(
  '[Category] begin update',
  props<{ oldVal: string; newVal: string }>()
);

export const updateCategories = createAction(
  '[Category] update',
  props<{ payload: string[] }>()
);

export const updateSelectedCategory = createAction(
  '[Category] update selected category',
  props<{ payload: string }>()
);

export const beginUpdateSelectedCategory = createAction(
  '[Category] begin update selected category',
  props<{ payload: string }>()
);

export const deleteCategory = createAction(
  '[Category] delete category',
  props<{ payload: string }>()
);

export const getAllCategories = createAction('[Categories] getAllCategories');

export const getSelectedCategory = createAction(
  '[Categories] getSelectedCategory'
);
