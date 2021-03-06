// Workout Page: Page that contains the users current workout to be completed (with video)

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute , NavigationExtras} from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
})
export class WorkoutPage implements OnInit {
  public workoutId:string; // workoutid
  public eventId:string;
  public videoId:number; // if we ever use more than 1 vid per workout

  // to display on workoutpage
  public name:string;
  public type:string;
  public muscleGroup:Array<string>;
  public videos:Array<string>; // TODO: display all list of videos
  public date:string; // date of workout
  public sets:number;
  public rest:number;

  public safeUrl; // temp single video
  public video;

  constructor(private route:ActivatedRoute, 
      private router:Router,
      private storageService:StorageService,
      private sanitizer: DomSanitizer) {
    this.workoutId = this.route.snapshot.paramMap.get('workoutId'); // get workout id from route it was sent to
    this.eventId = this.route.snapshot.paramMap.get('eventId'); // get event id from route it was sent to
    this.muscleGroup = [];

    this.getWorkout();
    this.getEvent();
    this.sets = 2;
    this.rest = 3;
    this.storageService.getFitnessLevel().then(level=>{
      this.sets = this.sets * parseInt(level);
      if (parseInt(level) <= 3){
        this.rest = 3;
      }
      else if (parseInt(level) <= 6){
        this.rest = 2;
      }
      else{
        this.rest = 1;
      }
    });
   }

  ngOnInit() {}

  getWorkout() {
    this.storageService.getWorkoutFromId(this.workoutId).then(result => {
      this.name = result.name;
      this.type = result.type;
      this.muscleGroup.push(result.muscleGroup);
      console.log(this.muscleGroup);

      let videos = [];
      result.videos.forEach(video => {
        videos.push(video.url);
      });
      this.video = videos[0];
      this.videoId = 0;
    });
  }

  // incremented month
  getEvent() {
    this.storageService.getEvents().then(events => {
      let date = new Date(events[parseInt(this.eventId)-1].startTime); // -1 is temp
      this.date = (date.getMonth()+1).toString() + "-" + (date.getDate()).toString() + "-" + (date.getFullYear()).toString();
    });
  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  markComplete() {
    this.storageService.setCompletedWorkout(this.workoutId);
    this.storageService.getEvents().then(events => {
      events[parseInt(this.eventId)-1].completed = true;
      this.storageService.setEvents(events);
    });
    console.log("marked event as complete");

    let navigationExtras: NavigationExtras = {
      queryParams: {
        workoutId: this.workoutId,
        eventId: this.eventId,
        videoId: this.videoId
      }
    };

    this.router.navigate(['feedback'], navigationExtras);
  }

  // FIXME: completed needs to be false
  markUncomplete(){
    this.storageService.setCompletedWorkout(this.workoutId);
    this.storageService.getEvents().then(events => {
      // events.
      events[parseInt(this.eventId)-1].completed = true;
      this.storageService.setEvents(events);
    });
    console.log("incomplete");
  }
}
