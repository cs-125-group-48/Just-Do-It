import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  updateProfile(name:string, weight:string, height:string, fitnessLevel:string, birthdate:string){
    this.storage.set('name', name);
    this.storage.set('birthdate', birthdate);
    this.storage.set('weight', weight);
    this.storage.set('height', height);
    this.storage.set('fitness-level', fitnessLevel);
    console.log("successfully added new profile");

  }
  getName():Promise<any>{
    // let name:string;
    return this.storage.get('name');
  
  }

  getBirthdate():Promise<any> {
    return this.storage.get('birthdate');
  }

  getFitness():Promise<any> {
    return this.storage.get('fitness-level');
  }

  getWeight():Promise<any> {
    return this.storage.get('weight');
  }

  getHeight():Promise<any> {
    return this.storage.get('height');
  }

  updateFitness(fitnessLevel:string) {
    this.storage.set('fitness-level', fitnessLevel);
  }

}
