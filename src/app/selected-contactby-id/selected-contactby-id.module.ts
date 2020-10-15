import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectedContactbyIdPageRoutingModule } from './selected-contactby-id-routing.module';

import { SelectedContactbyIdPage } from './selected-contactby-id.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectedContactbyIdPageRoutingModule
  ],
  declarations: [SelectedContactbyIdPage]
})
export class SelectedContactbyIdPageModule {}
