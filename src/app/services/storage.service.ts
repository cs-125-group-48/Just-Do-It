// Local storage
// To see local storage in chrome: go to Developer Tools, on top bar click on Application, then IndexedDB -> _ionicckv

import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { ProfileData } from '../data/ProfileData'

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

}
