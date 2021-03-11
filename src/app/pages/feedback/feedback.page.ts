// Feedback Page: Page that loads once user checks complete on their workout

import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  public service:StorageService;
  public feedback:string;
  public fitnessLevel:string;
  public exerciseFeedback:string;

  constructor(private storageService:StorageService) {
    this.service = storageService;
  }

  ngOnInit() {
  }

  submit() {
    // update fitness level


    // add exercise info to whatever
    this.service.getCompletedWorkout().then( workout_id =>{
      this.service.getExerciseFeedback().then( result =>{
        this.service.addExerciseFeedback(workout_id, parseInt(this.exerciseFeedback));
      });
    });


    // TODO: bug where this doesn't update the profile page
    // this.service.getFitness().then((result) => {
    //   this.fitnessLevel = (parseInt(result.toString()) + parseInt(this.feedback)).toString();
    //   console.log(this.fitnessLevel);
    //   this.service.updateFitness(this.fitnessLevel);
    // });

    // Profile page only updated after app refresh
    this.service.getFitnessLevel().then(result=>{
      console.log(result);
      var newLevel = parseInt(result) + parseInt(this.feedback);
      if (newLevel >= 1){
        this.service.setFitnessLevel(newLevel.toString());
      }
    });
  }

}
