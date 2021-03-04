// Local storage
// To see local storage in chrome: go to Developer Tools, on top bar click on Application, then IndexedDB -> _ionicckv

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ProfileData } from 'src/app/data/ProfileData';
import { WorkoutData } from 'src/app/data/WorkoutData';
import { ScheduleData } from 'src/app/data/ScheduleData';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  async updateUserProfile(name:string, birthdate:string, weight:string, height:string, fitnessLevel:string){
    // to update user information into local storage
    let profile = new ProfileData();
    profile.updateProfile(name, birthdate, weight, height, fitnessLevel);
    this.storage.set('profile', profile); // store in local storage
  }

  async getUserProfile():Promise<ProfileData> {
    return await this.storage.get('profile'); // get profile from local storage
  }

  async setWorkoutData(exercises:any) {
    // set workout data and store in local storage (from json "exercises")

    // json format:
    /* Exercise Name : { 0 : Type, 
      1 : Description, 
      2-16 : 
          thumbnails : ..., 
          url : youtubelink, 
          title : youtubetitle }
    */

   // getting all workouts from json and converting them into WorkoutData/VideoData objects
   let workouts = [];
    for (var exercise in exercises) {
      let value = exercises[exercise]; 

      let videos = [];

      for (let i=2; i<=16; i++) { // getting video data of workout
        videos.push( value[i] );
      }

      let workout = new WorkoutData(exercise, value[0], value[1], videos); // convert json into WorkoutData object
      workouts.push(workout); // push workout to list of workouts
    }
    
    this.storage.set("workouts", workouts); // set workouts into local storage
  }

  async getWorkoutData(): Promise<WorkoutData> {
    return await this.storage.get('workouts').then( result => {
      return result;
    });
  }

  async setUserSchedule(daysFree, startTime:string, endTime:string, focus, endDate:string) {
    let schedule = new ScheduleData(daysFree, startTime, endTime, focus, endDate);
    this.storage.set("schedule", schedule);
  }

  async setEvents(events:any) {
    this.storage.set("events", events);
  }

  async getEvents() {
    return await this.storage.get("events");
  }

}
