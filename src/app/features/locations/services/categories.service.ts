import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor() {}

  postCategories(categories: string[]): Observable<string> {
    return new Observable((observer) => {
      localStorage.setItem('categories', JSON.stringify(categories));
      observer.next('success');
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

  updateSelectedCategory(selectedCategory: string): Observable<string> {
    return new Observable((observer) => {
      localStorage.setItem('selectedCategory', selectedCategory);
      observer.next(selectedCategory);
      observer.complete();
    });
  }
}
