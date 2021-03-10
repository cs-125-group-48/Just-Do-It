// HomePage: home page for user that shows next workout

import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public name:string;
  public workout:string;
  public workoutId:string;
  public eventId:string;

  public month:string;
  public day:string;

  private monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  constructor(private storageService:StorageService) {
    this.storageService.getUserProfile().then((result) => {
      // get name from storage
      this.name = result.name;
    });

    this.getNextWorkout()
  }


  getNextWorkout() {
    this.storageService.getEvents().then((result) => {
      // loop through and find first event that hasn't been completed yet
      // console.log(result);
      if (result == undefined) {
        this.workout = "Please schedule a workout routine";
        this.month = "";
        this.day = "";
      }
      else {
        for (let i=0; i<result.length; i++) {
          if (!result[i].completed) {
            this.workout = result[i].title;
            this.workoutId = result[i].workoutid;
            this.eventId = result[i].id;

            // get month and day of workout
            let date = new Date(result[i].startTime);
            this.month = this.monthNames[(date.getMonth()).toLocaleString()];
            this.day = (date.getDate()).toLocaleString();
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
