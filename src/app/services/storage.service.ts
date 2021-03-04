// Local storage
// To see local storage in chrome: go to Developer Tools, on top bar click on Application, then IndexedDB -> _ionicckv

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ProfileData } from 'src/app/data/ProfileData';
import { WorkoutData } from 'src/app/data/WorkoutData';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  updateUserProfile(name:string, birthdate:string, weight:string, height:string, fitnessLevel:string){
    // to update user information into local storage
    let profile = new ProfileData();
    profile.updateProfile(name, birthdate, weight, height, fitnessLevel);
    this.storage.set('profile', profile); // store in local storage
  }

  getUserProfile():Promise<ProfileData> {
    return this.storage.get('profile'); // get profile from local storage
  }

  setWorkoutData(exercises:any) {
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

  // TODO: create set and get user schedule
  setUserSchedule() {

  }

}
