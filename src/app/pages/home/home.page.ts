// HomePage: home page for user that shows next workout

import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public change:boolean;
  public name:string;
  public workout:string;
  public workoutId:string;
  public eventId:string;

  constructor(private storageService:StorageService) {
    this.storageService.getUserProfile().then((result) => {
      // get name from storage
      this.name = result.name;
    });

    this.getNextWorkout();
  }

  static updateNextWorkout(){
    HomePage.getNextWorkout();
  }

  getNextWorkout() {
    this.storageService.getEvents().then((result) => {
      // loop through and find first event that hasn't been completed yet
      // console.log(result);
      if (result == undefined) {
        this.workout = "Please schedule a workout routine";
      }
      else {
        for (let i=0; i<result.length; i++) {
          if (!result[i].completed) {
            this.workout = result[i].title;
            this.workoutId = result[i].workoutid;
            this.eventId = result[i].id;
            break;
          }
        }
      }
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.getNextWorkout();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 100);
  }


  ionViewWillEnter() { // since tabs say cached, this functions makes sure the following will be run every time the page loads
    this.getNextWorkout();
  }

}
