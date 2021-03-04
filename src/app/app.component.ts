import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import * as data from 'Exercises Metadata/Metadata.json';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  private exercises;
  rootPage: any = 'survey'; // sruvey is starting page, TODO: hide survey page when user already submits a survey
  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    private router : Router,
    private storage : StorageService
  ) {
    this.exercises = data.default; // set exercises to json metadata
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.router.navigateByUrl('survey');
      this.setWorkoutsFromJson();
      // TODO load json
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }

  setWorkoutsFromJson() {
    this.storage.setWorkoutData(this.exercises); // set list of workout data into local storage
  }

}