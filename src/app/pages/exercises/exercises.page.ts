import { Component, OnInit } from '@angular/core';
import * as data from 'Exercises Metadata/Metadata.json';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})

export class ExercisesPage implements OnInit {
  private exercises;
  private searchbar;
  private filterExercises;


  constructor() {
    this.exercises = data.default;
    this.filterExercises = new Map<any, any>();
    for (var key in this.exercises){
      this.filterExercises.set(key, this.exercises[key]);
    }
  }

  filteredExercises(){
    return this.filterExercises;
  }

  handleInput(event){
    let query: string = event.target.value.toLowerCase();
    console.log(query);
    for (var key in this.exercises){
      console.log(key.toLowerCase());
    }

    console.log(this.filterExercises.size);

    if (query){
      var map = new Map<any, any>();
      for (var key in this.exercises){
        console.log(key.toLowerCase());
        if (key.toLowerCase().startsWith(query)){
          console.log(query);
          map.set(key, this.exercises[key]);
        }
      }

      // this.filterExercises = map;
    }

    // console.log(this.filterExercises.size);
  }

  ngOnInit() {
    this.searchbar = document.querySelector('ion-searchbar');
    this.searchbar.addEventListener('ionInput', this.handleInput);
  }

  test(){
    console.log("a");
  }
}
