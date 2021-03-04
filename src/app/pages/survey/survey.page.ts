// Survey Page: Page loads on start up prompting for user information

import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

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
  public service:StorageService; // for local storage

  constructor(private storageService:StorageService) { 
    this.service = storageService;
    
  }
  

  ngOnInit() {
  }

  click() { // function for clicking submit button on survey form
    let height = "" + this.feet + "' " + this.inches + "\"";
    let fitnessLevel = this.active; // TEMPORARY, active will be used to calculate a different fitnesslevel in the future
    this.service.updateUserProfile(this.name, this.birthdate, this.weight, height, fitnessLevel); // updates profile in local storage


  }
}
