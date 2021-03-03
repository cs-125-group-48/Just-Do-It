import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import {CardComponent } from '../../components/card/card.component';
import { AddworkoutPage } from '../../pages/addworkout/addworkout.page';

import { HomePageRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, CardComponent, AddworkoutPage]
})
export class HomePageModule {}
