import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'locations',
    pathMatch: 'full',
  },
  {
    path: 'locations',
    loadChildren: () =>
      import('./features/locations/locations-routing.module').then(
        (m) => m.LocationsRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
