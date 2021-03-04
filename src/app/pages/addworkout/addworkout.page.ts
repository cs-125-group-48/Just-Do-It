// AddWorkout Page: Page for when the user wants to add a new workout routine to their schedule

import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-addworkout',
  templateUrl: './addworkout.page.html',
  styleUrls: ['./addworkout.page.scss'],
})
export class AddworkoutPage implements OnInit {
  @Input() showButton:boolean; // to hide or show confirmation/cancel buttons
  @Input() route:string; // route after selecting confirmation button, depends on where addworkout page is

  public form = [
    { val: 'Monday', isChecked:false },
    { val: 'Tuesday', isChecked:false },
    { val: 'Wednesday', isChecked:false },
    { val: 'Thursday', isChecked:false },
    { val: 'Friday', isChecked:false },
    { val: 'Saturday', isChecked:false },
    { val: 'Sunday', isChecked:false },
  ]
  public service:StorageService;

  public focus:string; // focus for workout
  public startTime:string;
  public endTime:string;

  constructor(private storageService:StorageService, public toastController: ToastController) { 
    this.service = storageService;
    
    // assign default inputs for page
    this.showButton = true;
    this.route = "['/']";

  }

  ngOnInit() {
  }

  addWorkoutToStorage() {
    let daysFree = [];
    // add information from add workout page to local storage when function is called
    this.form.forEach(item => (item["isChecked"]) ? daysFree.push(item["val"]) : ""); // store selected days free in array "daysFree"
    console.log(daysFree);

    this.presentToast();

  }

  async presentToast() {
    // toast message that appears for user confirmation
    const toast = await this.toastController.create({
      message: 'Your schedule has been saved.',
      duration: 1500
    });
    toast.present();
  }
}
