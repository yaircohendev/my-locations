import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SnackBarService } from '../../../core/services/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private snackBar: SnackBarService) {}

  addNewCategory(category: string): Observable<string> {
    return new Observable((observer) => {
      const categories =
        JSON.parse(localStorage.getItem('categories') as string) || [];
      const alreadyExists = categories.some((c: string) => c === category);
      if (!alreadyExists) {
        categories.push(category);
        localStorage.setItem('categories', JSON.stringify(categories));
        observer.next(category);
      } else {
        const error = 'Category already exists';
        this.snackBar.showSnackBar(error);
        observer.error(error);
      }
      observer.complete();
    });
  }

  getCategories(): Observable<string[]> {
    return new Observable((observer) => {
      const categories = JSON.parse(
        localStorage.getItem('categories') as string
      );
      observer.next(categories || []);
      observer.complete();
    });
  }

  getSelectedCategory(): Observable<string> {
    return new Observable((observer) => {
      observer.next((localStorage.getItem('selectedCategory') as string) || '');
      observer.complete();
    });
  }

  updateCategory(oldVal: string, newVal: string): Observable<string[]> {
    return new Observable((observer) => {
      let categories = JSON.parse(localStorage.getItem('categories') as string);
      categories = categories.map((c: string) =>
        c === oldVal ? newVal : oldVal
      );
      localStorage.setItem('categories', JSON.stringify(categories));
      observer.next(categories);
      observer.complete();
    });
  }

  updateSelectedCategory(selectedCategory: string): Observable<string> {
    return new Observable((observer) => {
      localStorage.setItem('selectedCategory', selectedCategory);
      observer.next(selectedCategory);
      observer.complete();
    });
  }

  deleteCategory(category: string): Observable<string[]> {
    return new Observable((observer) => {
      let categories = JSON.parse(localStorage.getItem('categories') as string);
      categories = categories.filter((c: string) => c !== category);
      localStorage.setItem('categories', JSON.stringify(categories));
      observer.next(categories);
      observer.complete();
    });
  }
}
