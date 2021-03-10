// Profile Page: Page containning user information

import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ProfileData } from '../../data/ProfileData';
import { Health } from '@ionic-native/health/ngx';
import { Platform } from '@ionic/angular';

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
  public steps:string;
  public calories:string;

  public profile:ProfileData;

  constructor(private storageService:StorageService, private health:Health, private plt:Platform) { 
    this.service = storageService; // access storage

    this.service.getUserProfile().then((result) => {
      // get information from storage
      this.name = result.name;
      this.age = this.getAge(result.birthdate);
      this.weight = result.weight;
      this.height = result.height;
      this.fitnessLevel = result.fitnessLevel;
    });
  }

  ionViewWillEnter() { // since tabs say cached, this functions makes sure the following will be run every time the page loads
    this.getHealthData(); // requeries to get new live health data
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

  getHealthData() { // get health data from google fit api
    this.plt.ready().then(() => { // wait for platform to be loaded in before checking health stats

      this.health.isAvailable().then(available => { // check if Google fit API accessible
        if (available) {
          this.health.requestAuthorization([ // request access to Google fit data
            "distance",
            {
              read: ["steps", "calories"], 
              write: [], 
            },
          ])
          .then(res => console.log("Response " + res))
          .catch(e => console.log("Error " + e));

          let start = new Date(new Date().setHours(0, 0, 0, 0)); // get beginning of day
          console.log("Start of day: " + start);

          this.queryHealthData('steps');
          this.queryHealthData('calories');

        }
      })

    });
  }

  queryHealthData(type:string) {
    this.health.queryAggregated({ // query to get step data
      startDate: new Date(new Date().setHours(0, 0, 0, 0)), // beginning of day
      endDate: new Date(), // now
      dataType: type,
      bucket: 'day'
    })
    .then(entries => {
      console.log(entries);
      if (type === "steps") { this.steps = entries[0].value; }
      else if (type === "calories") { this.calories = (Math.round(parseInt(entries[0].value))).toLocaleString(); }
    })
    .catch(e => console.log("Error: " + e));
  }

  doRefresh(event) { // when refresh page
    console.log('Begin async operation');
    this.getHealthData();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 100);
  }
}
