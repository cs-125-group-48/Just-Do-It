// Survey Page: Page loads on start up prompting for user information

import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ToastController } from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {
  public name:string;  
  public active:string; // how active the user is
  public weight:string;
  public feet:string; // for height
  public inches:string; // for height
  public birthdate:string;
  public service:StorageService; // for storage


  constructor(private storageService:StorageService, public toastController: ToastController, private router:Router) { 
    this.service = storageService;
    
  }
  

  ngOnInit() {
  }

  click() { // function for clicking submit button on survey form
    let height = "" + this.feet + "' " + this.inches + "\"";
    let fitnessLevel = this.active; // TEMPORARY, active will be used to calculate a different fitnesslevel in the future
    
    let inputs = {"name": this.name, "birthdate": this.birthdate, "weight": this.weight, "height feet": this.feet, 
    "height inches": this.inches, "activity": this.active};
    
    var value;
    var input;
    var success = true;

    Object.keys(inputs).forEach(function(key) {
      value = inputs[key];
      if (value === undefined) {
        success = false;
        input = key;
        return;
      }
    });

    if (success) {
      this.service.updateUserProfile(this.name, this.birthdate, this.weight, height, fitnessLevel); // updates profile in storage
      this.router.navigateByUrl('/tabs/home');
    }
    else {
      this.presentToast(input);
    }
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: 'Please enter ' + message + ' field.',
      duration: 1000
    });
    toast.present();
  }
}
