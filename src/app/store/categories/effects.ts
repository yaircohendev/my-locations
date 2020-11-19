import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as CategoriesActions from './actions';
import {
  addCategories,
  addCategory,
  beginUpdateSelectedCategory,
  updateCategories,
  updateSelectedCategory,
} from './actions';
import { CategoriesService } from '../../features/locations/services/categories.service';
import { AppState } from '../index';
import { SnackBarService } from '../../core/services/snackbar.service';

@Injectable({ providedIn: 'root' })
export class CategoriesEffects {
  @Effect({ dispatch: false }) addCategory$ = this.actions$.pipe(
    ofType(CategoriesActions.beginAddCategory),
    switchMap((action) =>
      this.categoriesService.addNewCategory(action.payload).pipe(
        tap((value) => {
          this.store.dispatch(addCategory({ payload: value }));
          this.store.dispatch(beginUpdateSelectedCategory({ payload: value }));
          this.snackBarService.showSnackBar('Category added successfully');
        })
      )
    )
  );

  @Effect({ dispatch: false }) loadCategories$ = this.actions$.pipe(
    ofType(CategoriesActions.getAllCategories),
    switchMap(() =>
      this.categoriesService
        .getCategories()
        .pipe(
          tap((value) => this.store.dispatch(addCategories({ payload: value })))
        )
    )
  );

  @Effect({ dispatch: false }) loadSelectedCategory$ = this.actions$.pipe(
    ofType(CategoriesActions.getSelectedCategory),
    switchMap(() =>
      this.categoriesService
        .getSelectedCategory()
        .pipe(
          tap((value) =>
            this.store.dispatch(updateSelectedCategory({ payload: value }))
          )
        )
    )
  );

  @Effect({ dispatch: false }) updateCategory$ = this.actions$.pipe(
    ofType(CategoriesActions.beginUpdateCategory),
    switchMap((action) =>
      this.categoriesService.updateCategory(action.oldVal, action.newVal).pipe(
        tap((categories) => {
          this.store.dispatch(updateCategories({ payload: categories }));
          this.store.dispatch(
            beginUpdateSelectedCategory({ payload: action.newVal })
          );
        })
      )
    )
  );

  @Effect({ dispatch: false })
  beginUpdatedSelectedCategory$ = this.actions$.pipe(
    ofType(CategoriesActions.beginUpdateSelectedCategory),
    switchMap((action) =>
      this.categoriesService.updateSelectedCategory(action.payload).pipe(
        tap(() => {
          this.store.dispatch(
            updateSelectedCategory({ payload: action.payload })
          );
        })
      )
    )
  );

  @Effect({ dispatch: false }) deleteCategory$ = this.actions$.pipe(
    ofType(CategoriesActions.deleteCategory),
    switchMap((action) =>
      this.categoriesService.deleteCategory(action.payload).pipe(
        tap((categories) => {
          this.store.dispatch(updateCategories({ payload: categories }));
          this.store.dispatch(beginUpdateSelectedCategory({ payload: '' }));
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private categoriesService: CategoriesService,
    private snackBarService: SnackBarService
  ) {}
}
