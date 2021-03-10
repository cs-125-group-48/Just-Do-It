// Workout Page: Page that contains the users current workout to be completed (with video)

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
})
export class WorkoutPage implements OnInit {
  public workoutId:string; // workoutid
  public eventId:string;

  // to display on workoutpage
  public name:string;
  public type:string;
  public muscleGroup:Array<string>;
  public videos:Array<string>; // TODO: display all list of videos 
  public date:string; // date of workout

  public safeUrl; // temp single video
  public video;

  constructor(private route:ActivatedRoute, private storageService:StorageService,private sanitizer: DomSanitizer) {
    this.workoutId = this.route.snapshot.paramMap.get('workoutId'); // get workout id from route it was sent to 
    this.eventId = this.route.snapshot.paramMap.get('eventId'); // get event id from route it was sent to 

    this.getWorkout();
    this.getEvent();
   }

  ngOnInit() {}

  getWorkout() {
    this.storageService.getWorkoutFromId(this.workoutId).then(result => {
      this.name = result.name;
      this.type = result.type;
      this.muscleGroup = result.muscleGroup;

      let videos = [];
      result.videos.forEach(video => {
        videos.push(video.url);
      });
      this.video = videos[0];
    });
  }

  getEvent() {
    this.storageService.getEvents().then(events => {
      let date = new Date(events[parseInt(this.eventId)-1].startTime); // -1 is temp
      this.date = (date.getMonth()).toString() + "-" + (date.getDate()).toString() + "-" + (date.getFullYear()).toString();
    });
  }

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  markComplete() {
    this.storageService.getEvents().then(events => {
      events[parseInt(this.eventId)-1].completed = true;
      this.storageService.setEvents(events);
    });
    console.log("marked event as complete");
  }
}
