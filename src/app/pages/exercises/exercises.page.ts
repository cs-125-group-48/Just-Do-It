// Exercise Page: Page that lists all exercises and be able to search through those exercises

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
// import * as data from 'Exercises Metadata/Metadata.json';
import { StorageService } from 'src/app/services/storage.service';

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


  constructor(private storage : StorageService) {
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

  test() { // TODO: when clicking on exercise make popup of exercise information

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
  }
}
