import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from './index';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffects } from './categories/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([CategoriesEffects]),
  ],
  exports: [],
})
export class StateModule {}
