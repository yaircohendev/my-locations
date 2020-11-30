import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
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
import { selectAllCategories } from './selectors';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriesEffects {
  @Effect({ dispatch: false }) addCategory$ = this.actions$.pipe(
    ofType(CategoriesActions.beginAddCategory),
    withLatestFrom(this.store.pipe(select(selectAllCategories))),
    switchMap(([action, categories]) => {
      const updatedCategories = [...categories];
      const category = action.payload;
      const alreadyExists = categories.some((c: string) => c === category);
      if (!alreadyExists) {
        updatedCategories.push(category);
      } else {
        this.snackBar.showSnackBar('Category already exists');
        return of(false);
      }
      return this.categoriesService.postCategories(updatedCategories).pipe(
        tap(() => {
          this.store.dispatch(addCategory({ payload: category }));
          this.store.dispatch(
            beginUpdateSelectedCategory({ payload: category })
          );
          this.snackBarService.showSnackBar('Category added successfully');
        })
      );
    })
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
    withLatestFrom(this.store.pipe(select(selectAllCategories))),
    switchMap(([action, categories]) => {
      const updatedCategories = categories.map((c: string) =>
        c === action.oldVal ? action.newVal : action.oldVal
      );
      return this.categoriesService.postCategories(updatedCategories).pipe(
        tap(() => {
          this.store.dispatch(updateCategories({ payload: updatedCategories }));
          this.store.dispatch(
            beginUpdateSelectedCategory({ payload: action.newVal })
          );
        })
      );
    })
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
    withLatestFrom(this.store.pipe(select(selectAllCategories))),
    switchMap(([action, categories]) => {
      const updatedCategories = categories.filter(
        (c: string) => c !== action.payload
      );
      return this.categoriesService.postCategories(updatedCategories).pipe(
        tap(() => {
          this.store.dispatch(updateCategories({ payload: updatedCategories }));
          this.store.dispatch(beginUpdateSelectedCategory({ payload: '' }));
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private categoriesService: CategoriesService,
    private snackBarService: SnackBarService,
    private snackBar: SnackBarService
  ) {}
}
