import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarPage } from './calendar.page';
import { SearchPage } from '../pages/search/search.page'
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CalendarPageRoutingModule } from './calendar-routing.module';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    CalendarPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [CalendarPage, SearchPage]
})
export class CalendarPageModule {}
