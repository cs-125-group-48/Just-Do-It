// Profile Page: Page containning user information

import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ProfileData } from '../../data/ProfileData';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage {
  public service:StorageService;
  public name:string;
  public age:number;
  public weight:string;
  public height:string;
  public fitnessLevel:string;

  public profile:ProfileData;

  constructor(private storageService:StorageService) { 
    this.service = storageService; // access local storage

    this.service.getUserProfile().then((result) => {
      // get information from local storage
      this.name = result.name;
      this.age = this.getAge(result.birthdate);
      this.weight = result.weight;
      this.height = result.height;
      this.fitnessLevel = result.fitnessLevel;
    })
  }
  

  ngOnInit() {
  }

  // https://www.codegrepper.com/code-examples/javascript/calculate+age+based+on+date+of+birth+in+javascript
  getAge(dateString):number
  // calculates age from string of date
  {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
          age--;
      }
      return age;
  }


}
