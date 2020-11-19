import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import {
  beginAddCategory,
  beginUpdateCategory,
  deleteCategory,
} from '../../../../store/categories/actions';
import { Observable } from 'rxjs';
import { selectSelectedCategory } from '../../../../store/categories/selectors';
import { take } from 'rxjs/operators';
import { DialogTypes } from '../../models/locations.model';

export interface DialogData {
  type: DialogTypes;
}

@Component({
  selector: 'app-locations-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent implements OnInit {
  selectedCategory$: Observable<string>;
  nameFormControl: FormControl;

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private locationsService: CategoriesService,
    private store: Store<AppState>
  ) {
    this.selectedCategory$ = store.pipe(select(selectSelectedCategory));
  }

  ngOnInit(): void {
    this.selectedCategory$.pipe(take(1)).subscribe((selectedCategory) => {
      this.nameFormControl = new FormControl(
        this.data.type === 'edit' ? selectedCategory : '',
        [Validators.required, Validators.minLength(3)]
      );
    });
  }

  addNewCategory(): void {
    this.store.dispatch(
      beginAddCategory({ payload: this.nameFormControl.value })
    );
    this.dialogRef.close();
  }

  editCategory(): void {
    this.selectedCategory$.pipe(take(1)).subscribe((selectedCategory) => {
      this.store.dispatch(
        beginUpdateCategory({
          oldVal: selectedCategory,
          newVal: this.nameFormControl.value,
        })
      );
      this.dialogRef.close();
    });
  }

  deleteCategory(): void {
    this.selectedCategory$.pipe(take(1)).subscribe((selectedCategory) => {
      this.store.dispatch(deleteCategory({ payload: selectedCategory }));
      this.dialogRef.close();
    });
  }
}
