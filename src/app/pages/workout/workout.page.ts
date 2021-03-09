// Workout Page: Page that contains the users current workout to be completed (with video)

import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Health, HealthStoreOptions } from '@ionic-native/health/ngx';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
})
export class WorkoutPage implements OnInit {

  constructor(private plt: Platform, private health: Health) { 
    // this.getHealth();
    this.plt.ready().then(() => {
      this.health.isAvailable().then(available => {
        if (available) {
          this.health.requestAuthorization([
            "distance",
            {
              read: ["steps"], 
              write: [], 
            },
          ])
          .then(res => console.log("response " + res))
          .catch(e => console.log("error " + e));
        }
      })
    });

    // this.health.isAvailable()
    // .then((available:boolean) => {
    //   console.log(available);
    //   this.health.requestAuthorization([
    //     "distance",
    //     {
    //       read: ["steps"], 
    //       write: [], 
    //     },
    //   ])
    //   .then(res => console.log("response " + res))
    //   .catch(e => console.log("error " + e));
    // })
    // .catch(e => console.log("error " + e));


    // if (this.health.isAuthorized(["steps"])) {
    //   console.log("Already Authorised");
    //   this.health.requestAuthorization([
    //       "distance",
    //       {
    //         read: ["steps"], 
    //         // write: [], 
    //       },
    //     ])
    //     .then((res) => console.log("response " + res))
    //     .catch((e) => console.log("error " + e));

    //   // this.health.queryAggregated({
    //   //     startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), 
    //   //     endDate: new Date(), // now
    //   //     dataType: 'steps',
    //   //     bucket: 'day'
    //   //   })
    //   //   .then(res => console.log(res))
    //   //   .catch(e => console.log(e));
    // } else {
    //   this.health
    //     .requestAuthorization([
    //       "distance",
    //       "nutrition", 
    //       {
    //         read: ["steps"], 
    //         // write: [], 
    //       },
    //     ])
    //     .then((res) => console.log(res))
    //     .catch((e) => console.log(e));
    // }

    // let health = new Health();
    // const healtChanger = () => {
      //     health.isAvailable()
      //     .then((available:boolean) => {
      //       console.log(health.isAuthorized(['steps']));
      //   if(health.isAuthorized(['steps']))
      //   {
      //     console.log("Already Authorised");
      //     health.queryAggregated({
      //       startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
      //       endDate: new Date(), // now
      //       dataType: 'steps',
      //       bucket: 'day'
      //     })
      //     .then(res => console.log(res))
      //     .catch(e => console.log(e));
      //   }
      //   else {
      //     health.requestAuthorization([
      //       'distance', 'nutrition',  //read and write permissions
      //       {
      //         read: ['steps'],       //read only permission
      //       }
      //     ])
      //     .then(res => console.log(res))
      //     .catch(e => console.log(e));
      //   }
      // })
      // .catch(e => console.log(e)); 
    // };

  }

  

  ngOnInit() {

  }

  // getHealth() {
  //   this.health.isAvailable()
  //   .then((available:boolean) => {
  //     console.log(available);
  //     this.health.requestAuthorization([
  //       'distance', 'nutrition',  //read and write permissions
  //       {
  //         read: ['steps'],       //read only permission
  //         write: ['height', 'weight']  //write only permission
  //       }
  //     ])
  //     .then(res => console.log(res))
  //     .catch(e => console.log(e));
  //   })
  //   .catch(e => console.log(e));
  // }

}
