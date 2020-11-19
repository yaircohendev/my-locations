import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from './components/category-dialog/category-dialog.component';
import { DialogTypes } from './models/locations.model';
import { AppState } from '../../store';
import {
  selectAllCategories,
  selectSelectedCategory,
} from '../../store/categories/selectors';
import {
  beginUpdateSelectedCategory,
  getAllCategories,
  getSelectedCategory,
} from '../../store/categories/actions';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent implements OnInit {
  categories$: Observable<string[]>;
  selectedCategory$: Observable<string>;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {
    this.categories$ = store.pipe(select(selectAllCategories));
    this.selectedCategory$ = store.pipe(select(selectSelectedCategory));
  }

  ngOnInit(): void {
    this.setInitialData();
  }

  setInitialData(): void {
    this.store.dispatch(getAllCategories());
    this.store.dispatch(getSelectedCategory());
  }

  updateSelectedCategory(event: MatSelectChange): void {
    this.store.dispatch(beginUpdateSelectedCategory({ payload: event.value }));
  }

  openDialog(type: DialogTypes): void {
    this.dialog.open(CategoryDialogComponent, {
      width: '80%',
      maxWidth: '600px',
      data: { type },
    });
  }
}
