// AddWorkout Page: Page for when the user wants to add a new workout routine to their schedule

import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ToastController } from '@ionic/angular';
import { EventData } from 'src/app/data/EventData';
import { HomePage } from 'src/app/pages/home/home.page';

@Component({
  selector: 'app-addworkout',
  templateUrl: './addworkout.page.html',
  styleUrls: ['./addworkout.page.scss'],
})
export class AddworkoutPage implements OnInit {
  @Input() showButton:boolean; // to hide or show confirmation/cancel buttons
  @Input() route:string; // route after selecting confirmation button, depends on where addworkout page is

  public form = [
    { val: 'Monday', isChecked:false, },
    { val: 'Tuesday', isChecked:false },
    { val: 'Wednesday', isChecked:false },
    { val: 'Thursday', isChecked:false },
    { val: 'Friday', isChecked:false },
    { val: 'Saturday', isChecked:false },
    { val: 'Sunday', isChecked:false },
  ]
  public service:StorageService;

  public focus:[string]; // focus for workout
  public startTime:string;
  public endTime:string;
  public endDate:string;
  private days:{};

  constructor(private storageService:StorageService, public toastController: ToastController) { 
    // assign default inputs for page
    this.showButton = true;
    this.route = "['/']";

    this.days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  }

  ngOnInit() {
  }

  addWorkoutToStorage() {
  this.storageService.getWorkoutData().then( workouts => { // get workouts from storage

    let daysFree = [];
    // add information from add workout page to storage when function is called
    this.form.forEach(item => (item["isChecked"]) ? daysFree.push(item["val"]) : ""); // store selected days free in array "daysFree"
    this.storageService.setUserSchedule(daysFree, this.startTime, this.endTime, this.focus, this.endDate);

    let filteredWorkouts = []; // to store workouts that only target the user's focus
    for (var workout in workouts) {
      if (this.focus.includes((workouts[workout].type).toLowerCase())) { // if workout type matches user's focus types
        filteredWorkouts.push([workouts[workout].id, workouts[workout].name, workouts[workout].type]); // temp including name and type of workout
      }
    }
    


    let events = [];
    let date = new Date(); // new Date to get current date
    if (this.endDate != undefined) { // make sure user inputs endDate
      let end = new Date(this.endDate);
      while( !( (date.getDate() == end.getDate()) && (date.getMonth() == end.getMonth()) ) ) { // while date isn't end date
      
        let day = this.days[date.getDay()];
        if(daysFree.includes(day)) { // if day in user's free days
          // choose workout based on selected focus
          let randomWorkout = filteredWorkouts[Math.floor(Math.random() * filteredWorkouts.length)]; // get random workout

          // add event on this day
          let start = this.setDate(date, new Date(this.startTime));
          let end = this.setDate(date, new Date(this.endTime));
          let event = new EventData(randomWorkout[1], start, end, randomWorkout[2], randomWorkout[0]);
          events.push(event);
        }
        date.setDate(date.getDate() + 1); // increment date to next day
        // console.log(date);
        // }
      }
    }
    this.storageService.setEvents(events);
    this.presentToast("Your schedule has been saved.");

    });
    HomePage.change = !HomePage.change;
  }

  async presentToast(message:string) {
    // toast message that appears for user confirmation
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

  setDate(date:Date, time:Date):Date {
    let newDate = new Date();
    newDate.setHours(time.getHours());
    newDate.setMinutes(time.getMinutes());
    newDate.setDate(date.getDate());
    newDate.setMonth(date.getMonth());
    return newDate;
  }
}
