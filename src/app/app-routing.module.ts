import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'workout',
    loadChildren: () => import('./pages/workout/workout.module').then( m => m.WorkoutPageModule)
  },
  {
    path: 'workout/:id', 
    loadChildren: () => import('./pages/workout/workout.module').then( m => m.WorkoutPageModule)
  },
  {
    path: 'addworkout',
    loadChildren: () => import('./pages/addworkout/addworkout.module').then( m => m.AddworkoutPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./pages/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'exercises',
    loadChildren: () => import('./pages/exercises/exercises.module').then( m => m.ExercisesPageModule)
  },
  {
    path: 'survey',
    loadChildren: () => import('./pages/survey/survey.module').then( m => m.SurveyPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
