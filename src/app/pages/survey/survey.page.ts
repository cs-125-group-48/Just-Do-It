import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {
  public name:string;  
  public active:string;
  public weight:string;
  public feet:string;
  public inches:string;
  public birthdate:string;
  public service:StorageService;

  constructor(private storageService:StorageService) { 
    this.service = storageService;
    
  }
  

  ngOnInit() {
  }

  click() {
    let height = "" + this.feet + "' " + this.inches + "\"";
    let fitnessLevel = this.active;
    this.service.updateProfile(this.name, this.weight, height, fitnessLevel, this.birthdate);


  }
}
