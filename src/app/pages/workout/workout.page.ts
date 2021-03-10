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
  public id:string; // workoutid

  // to display on workoutpage
  public name:string;
  public type:string;
  public muscleGroup:Array<string>;
  public videos:Array<string>; // TODO: display all list of videos 
  public date:string; // date of workout

  public safeUrl; // temp single video
  public video;

  constructor(private route:ActivatedRoute, private storageService:StorageService,private sanitizer: DomSanitizer) {
    this.id = this.route.snapshot.paramMap.get('id'); // get workout id from route it was sent to 
    this.getWorkout();
    // todo get eventid and change to completed when user clicks on check


   }
  ngOnInit() {}

  getWorkout() {
    this.storageService.getWorkoutFromId(this.id).then(result => {
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

  getSafeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
