import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddworkoutPageRoutingModule } from './addworkout-routing.module';

import { AddworkoutPage } from './addworkout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddworkoutPageRoutingModule
  ],
  declarations: [AddworkoutPage]
})
export class AddworkoutPageModule {}
