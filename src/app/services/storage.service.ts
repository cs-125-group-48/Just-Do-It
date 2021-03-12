// Storage
// To see local storage in chrome: go to Developer Tools, on top bar click on Application, then IndexedDB -> _mydb -> _ionicckv

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ProfileData } from 'src/app/data/ProfileData';
import { WorkoutData } from 'src/app/data/WorkoutData';
import { ScheduleData } from 'src/app/data/ScheduleData';
import { UserDifficulty } from 'src/app/data/UserDifficulty';
import { EventData } from 'src/app/data/EventData';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  async updateUserProfile(name:string, birthdate:string, weight:string, height:string, fitnessLevel:string){
    // to update user information into storage
    let profile = new ProfileData();
    profile.updateProfile(name, birthdate, weight, height, fitnessLevel);
    this.storage.set('profile', profile); // store in storage

    this.storage.get("user_difficulty").then(data=>
      { // will reset if profile is reset
        let user_difficulty = new UserDifficulty(fitnessLevel);
        this.storage.set('user_difficulty', user_difficulty);
      });
  }

  async getUserProfile():Promise<ProfileData> {
    return await this.storage.get('profile'); // get profile from storage
  }

  async setWorkoutData(exercises:any) {
    // set workout data and store in storage (from json "exercises")

    // json format:
    /* Exercise Name : { 0 : Type, 
      1 : Description, 
      2-16 : 
          thumbnails : ..., 
          url : youtubelink, 
          title : youtubetitle }
    */

    this.storage.get("workouts").then(result => {

      if (!result) { // only set workouts if it doesn't exist already (did this because I didn't want to ids to change every time it boots)
        // getting all workouts from json and converting them into WorkoutData/VideoData objects
        let workouts = [];
          for (var exercise in exercises) {
            let value = exercises[exercise]; 

            let videos = [];

            for (let i=3; i<=17; i++) { // getting video data of workout
              videos.push( value[i] );
            }

            let workout = new WorkoutData(exercise, value[0], value[1], value[2], videos); // convert json into WorkoutData object
            workouts.push(workout); // push workout to list of workouts
          }
          
          this.storage.set("workouts", workouts); // set workouts into storage
      }
    });


  }

  async getWorkoutData(): Promise<Array<WorkoutData>> {
    return await this.storage.get('workouts').then( result => {
      return result;
    });
  }

  async getWorkoutFromId(id:string): Promise<WorkoutData> {
    console.log()
    return await this.storage.get('workouts').then( result => {
      for (let i=0; i<result.length; i++) {
        if (result[i].id === id) {
          return result[i]; // if id matches id in workout return that workout
        }
      };
    });
  }

  async updateWorkout(id:string, newWorkout:WorkoutData){
    this.storage.get('workouts').then( workouts => {
      for (var workout in workouts){
        if (workouts[workout].id == id){
          workouts[workout] = newWorkout;
        }
      }
      this.storage.set('workouts', workouts);
    });
  }

  async setUserSchedule(daysFree, startTime:string, endTime:string, focus, endDate:string) {
    let schedule = new ScheduleData(daysFree, startTime, endTime, focus, endDate);
    this.storage.set("schedule", schedule);
  }

  async setEvents(events:any) {
    this.storage.set("events", events);
  }

  async getEvents() :Promise<Array<EventData>>{
    return await this.storage.get("events");
  }

  async getEventFromId(eventId:string): Promise<EventData>{
    return await this.storage.get("events").then(events =>{
      for (var event in events){
        if (events[event].id == eventId){
          return events[event];
        }
      }
    });
  }


  // separate difficulty for each muscle-group
  async updateUserDifficulty(difficulty: UserDifficulty){
    // update user-difficulty levels [tracks difficulty for each muscle group]
    this.storage.set('user_difficulty', difficulty);
  }

  async getUserDifficulty():Promise<UserDifficulty> {
    return await this.storage.get('user_difficulty');
  }

}
