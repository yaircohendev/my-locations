import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationsComponent } from './locations.component';
import { LocationsModule } from './locations.module';

const routes: Routes = [
  {
    path: '',
    component: LocationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), LocationsModule],
  exports: [RouterModule],
})
export class LocationsRoutingModule {}
