import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import * as data from 'Exercises Metadata/Metadata.json';

//import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
//import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
//import { HttpClient } from '@angular/common/http';
//import { BehaviorSubject, Observable } from 'rxjs'; // npm install rxjs-compat --save
// npm install @ionic-native/core@5.1.0 --save


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  //private database: SQLiteObject;
  //private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private exercises;
  rootPage: any = 'survey'; // sruvey is starting page, TODO: hide survey page when user already submits a survey
  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    private router : Router,
    private storage : StorageService)
    //private sqlite: SQLite,
    //private sqlitePorter: SQLitePorter,
    //private http: HttpClient) 
  {
    this.exercises = data.default; // set exercises to json metadata

    /*
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'developers.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });
    });
    */

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
  /*
  seedDatabase() {
    this.createDB();
    this.loadFromJson(this.exercises);
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  createDB(){
    let create_table_sqlstmt =  " CREATE TABLE IF NOT EXISTS yt_metadata (" + 
      "workout_type text NOT NULL," +
      "muscle_group text NOT NULL," +
      "workout_description text NOT NULL," +
      "title text NOT NULL," +
      "url text," +
      "youtube_description text" +
      "difficulty float" +
      "); "

      this.database.executeSql(create_table_sqlstmt);
  }
 
  loadFromJson(exercises: any) {
    for (var exercise in exercises) {
      
      let value = exercises[exercise];
      
      let muscle_group = value[0];
      let workout_description = value[1];

      for (let i=2; i<=16; i++) { // getting video data of workout
        let sql = ' INSERT INTO yt_metadata(workout_type,muscle_group, workout_description,title,url,youtube_description) VALUES(?,?,?,?,?,?) '

        let data = [exercise, muscle_group, workout_description, 
          exercise['title'], exercise['url'],exercise['youtube_description']]
        
        this.database.executeSql(sql, data);
      }
    }
  }
  */

}
