// Feedback Page: Page that loads once user checks complete on their workout

import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { WorkoutData } from 'src/app/data/WorkoutData';
import { EventData } from 'src/app/data/EventData';
import { HomePage } from 'src/app/pages/home/home.page';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  public service:StorageService;
  public feedback:string;
  public fitnessLevel:string;

  public workoutType:string;
  public workoutId:string;
  public eventId:string;
  public heartRate:number;
  public restingHeartRate:number;

  // check for change
  private prevDifficulty:number;
  private newDifficulty:number;

  constructor(private route:ActivatedRoute, 
      private router:Router,
      private storageService:StorageService) { 
    this.service = storageService;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.workoutId) {
        this.workoutId = params.workoutId;  // get workout id from route it was sent to 
      }
      if (params && params.eventId) {
        this.eventId = params.eventId; // get event id from route it was sent to 
      }
    });

    this.restingHeartRate = 50;
  }

  async click() {
    // TODO: bug where this doesn't update the profile page
    // this.service.getFitness().then((result) => {
    //   this.fitnessLevel = (parseInt(result.toString()) + parseInt(this.feedback)).toString();
    //   console.log(this.fitnessLevel);
    //   this.service.updateFitness(this.fitnessLevel);
    // });

    // update workout difficulty based on heartrate
    this.getHeartRate();

    await this.service.getEventFromId(this.eventId).then(event =>
      this.workoutType = event.type
    );

    // updates difficulty of this workout
    await this.service.getWorkoutFromId(this.workoutId).then(workout =>
      {
        workout.difficulty = this.calculateDifficulty();
        this.service.updateWorkout(this.workoutId, workout);
      });

    // updates user-difficulty based on feedback
    await this.updateDifficulty();
    
    // updates future events based on preference
    console.log ("difficulties " + this.newDifficulty + " " + this.prevDifficulty);
    if (this.newDifficulty != this.prevDifficulty){
      console.log("update future events");
      this.updateFutureEvents();
    }
  }

  async updateDifficulty(){
    var difficulty = await this.service.getUserDifficulty();
    var newDiff:number;
    switch(this.workoutType){
      case "Arms":
        newDiff = difficulty.armsDifficulty + Number(this.feedback);
        newDiff = Math.min(newDiff, 10);
        newDiff = Math.max(newDiff, 0);
        this.prevDifficulty = difficulty.armsDifficulty;
        difficulty.armsDifficulty = newDiff;
        break;
      case "Legs":
        newDiff = difficulty.legsDifficulty + Number(this.feedback);
        newDiff = Math.min(newDiff, 10);
        newDiff = Math.max(newDiff, 0);
        this.prevDifficulty = difficulty.legsDifficulty;
        difficulty.legsDifficulty = newDiff;
        break;
      case "Abdominals":
        newDiff = difficulty.abdominalsDifficulty + Number(this.feedback);
        newDiff = Math.min(newDiff, 10);
        newDiff = Math.max(newDiff, 0);
        this.prevDifficulty = difficulty.abdominalsDifficulty;
        difficulty.abdominalsDifficulty = newDiff;
        break;
      case "Chest":
        newDiff = difficulty.chestDifficulty + Number(this.feedback);
        newDiff = Math.min(newDiff, 10);
        newDiff = Math.max(newDiff, 0);
        this.prevDifficulty = difficulty.chestDifficulty;
        difficulty.chestDifficulty = newDiff;
        break;
      case "Back":
        newDiff = difficulty.backDifficulty + Number(this.feedback);
        newDiff = Math.min(newDiff, 10);
        newDiff = Math.max(newDiff, 0);
        this.prevDifficulty = difficulty.backDifficulty;
        difficulty.backDifficulty = newDiff;
        break;
      case "Shoulder":
        newDiff = difficulty.shouldersDifficulty + Number(this.feedback);
        newDiff = Math.min(newDiff, 10);
        newDiff = Math.max(newDiff, 0);
        this.prevDifficulty = difficulty.shouldersDifficulty;
        difficulty.shouldersDifficulty = newDiff;
        break;
      case "Calves":
        newDiff = difficulty.calvesDifficulty + Number(this.feedback);
        newDiff = Math.min(newDiff, 10);
        newDiff = Math.max(newDiff, 0);
        this.prevDifficulty = difficulty.calvesDifficulty;
        difficulty.calvesDifficulty = newDiff;
        break;
      default:
        newDiff = 5;
        this.prevDifficulty = 5;
        console.log("workout type not found: " + this.workoutType);
    }
    this.newDifficulty = newDiff;
    this.service.updateUserDifficulty(difficulty);
  }


  // default for now
  getHeartRate(){
    this.heartRate = 100;
  }

  // calculate difficulty of workout based on heartrate
  calculateDifficulty():number{
    let difficulty:number = Math.min((this.heartRate/this.restingHeartRate) * (10/3), 10);
    return difficulty;
  }

  // set difficulty threshold to within 2 difficulty points of user-preferred difficulty
  // if not found, randomly picks another workout @ difficulty 5
  // (5 most probably means unsorted)
  async updateFutureEvents(){
    var events:Array<EventData>;

    await this.service.getEvents().then( e =>
      events = e);

    for (var event in events){
      // retrieve difficulty from event
      var workoutDifficulty:number;
      await this.service.getWorkoutFromId(events[event].workoutid).then(workout => 
          workoutDifficulty = workout.difficulty);

      console.log(events[event].completed + " " + 
        events[event].type + " " + this.workoutType + " " + 
        Math.abs(workoutDifficulty - this.newDifficulty));

      if (!events[event].completed && 
        events[event].type == this.workoutType && 
        Math.abs(workoutDifficulty - this.newDifficulty) >= 2)
      {
        var newWorkout :WorkoutData;
        await this.replaceWorkout().then(w => newWorkout = w);
        console.log("workout changed :" + events[event].title + " to " + newWorkout.name);

        events[event].workoutid = newWorkout.id;
        events[event].title = newWorkout.name;
      }
    }
    await this.service.setEvents(events);
  }
  

  // finds a replacement workout for an event
  // edited version of addWorkoutToStorage();
  async replaceWorkout():Promise<WorkoutData>{
    return await this.service.getWorkoutData().then( workouts => { // get workouts from storage
      var filteredWorkouts :Array<WorkoutData> = []; // to store workouts that only target the user's focus
      var backupWorkouts :Array<WorkoutData> = [];
      for (var workout in workouts) {
        // if workout is within new difficulty range && type matches
        if (workouts[workout].type == this.workoutType) {
          // difficulty matches
          if (Math.abs(workouts[workout].difficulty - this.newDifficulty) <= 2) { 
            filteredWorkouts.push(workouts[workout]); 
          }
          // difficulty doesn't match, only necessary if filteredWorkouts is empty
          else if (filteredWorkouts.length == 0){
            backupWorkouts.push(workouts[workout]);
          }
        }
      }
      if (filteredWorkouts.length == 0){
        return backupWorkouts[Math.floor(Math.random() * backupWorkouts.length)]; 
      }
      else{
        return filteredWorkouts[Math.floor(Math.random() * filteredWorkouts.length)]; 
      }
    });
  }

}
