import { Component } from '@angular/core';
import { NativeAudio } from 'ionic-native';
import { StorageService } from 'src/app/services/storage.service';

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
  public birthdate:string;
  public fitnessLevel:string;

  constructor(private storageService:StorageService) { 
    this.service = storageService;
    this.service.getName().then((result) => {
      this.name = result.toString();
    });

    this.service.getWeight().then((result) => {
      this.weight = result.toString();
    });

    this.service.getHeight().then((result) => {
      this.height = result.toString();
    });

    this.service.getBirthdate().then((result) => {
      this.age = this.getAge(result);
    });

    this.service.getFitness().then((result) => {
      this.fitnessLevel = result.toString();
    });

    
  }
  

  ngOnInit() {
  }


  // https://www.codegrepper.com/code-examples/javascript/calculate+age+based+on+date+of+birth+in+javascript
  getAge(dateString):number
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
