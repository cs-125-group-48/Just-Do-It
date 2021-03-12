// Exercise Page: Page that lists all exercises and be able to search through those exercises

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ExerciseInfoModalComponent } from '../exercise-info-modal/exercise-info-modal.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import * as data from 'Exercises Metadata/Metadata.json';
import { StorageService } from 'src/app/services/storage.service';
import { VideoData } from 'src/app/data/VideoData';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})

export class ExercisesPage implements OnInit {
  public exercises;
  private searchbar;
  private filterExercises;
  public searchTerm;
  public array;
  public workouts;

  constructor(private storage : StorageService, private modalCtrl: ModalController, private sanitizer: DomSanitizer) {
    this.setStorage();
  }

  ngOnInit() {

  }

  filteredExercises() {
    // filter through (from search bar) exercises
    this.storage.getWorkoutData().then(result => {
      this.setArray(result); // to reset list of array

      this.array = this.array.filter(item => { // to filter through array for terms that contain searchTerm
        return item.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });
    });
  }

  async exercise_info_modal(exercise) { // TODO: when clicking on exercise make popup of exercise information
    var exercise_description:string = "No description available.";
    var video:SafeResourceUrl;

    await this.storage.getWorkoutData().then(result => {
      for (var item in result){
        if (result[item].name === exercise){
          if (result[item].description.length > 0){
            exercise_description = result[item].description;
          }
          video = this.sanitizer.bypassSecurityTrustResourceUrl(result[item].videos[0].url);
          break;
        }
      }
    });

    const modal = await this.modalCtrl.create({
      component: ExerciseInfoModalComponent,
      componentProps:{
        name: exercise,
        description: exercise_description,
        video: video
      }
    });

    await modal.present();
  }

  setStorage() { // get data from storage and push into array
    this.storage.getWorkoutData().then(result => {
      this.setArray(result);
    });
  }

  setArray(result:any) { // pushes result into array
    this.array = []; // list of exercises to be displayed
    for (var item in result) {
      this.array.push(result[item].name);
    }
    this.array.sort();
  }
}
