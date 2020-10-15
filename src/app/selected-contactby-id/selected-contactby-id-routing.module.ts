import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedContactbyIdPage } from './selected-contactby-id.page';

const routes: Routes = [
  {
    path: '',
    component: SelectedContactbyIdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedContactbyIdPageRoutingModule {}
