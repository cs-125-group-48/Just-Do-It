import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExercisesPageRoutingModule } from './exercises-routing.module';

import { ExercisesPage } from './exercises.page';
import { ExerciseInfoModalComponent } from 'src/app/exercise-info-modal/exercise-info-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExercisesPageRoutingModule
  ],
  declarations: [ExercisesPage, ExerciseInfoModalComponent],
  entryComponents: [ExerciseInfoModalComponent]
})
export class ExercisesPageModule {}
