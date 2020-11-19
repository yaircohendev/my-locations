import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.scss'],
})
export class SelectCategoryComponent {
  @Input() selectedCategory: string | null;
  @Input() categories: string[] | null;
  @Output() updateSelectedCategory = new EventEmitter<MatSelectChange>();
  constructor() {}
}
