// Exercise Page: Page that lists all exercises and be able to search through those exercises

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import * as data from 'Exercises Metadata/Metadata.json';

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


  constructor() {
    this.exercises = data.default; // load json 
    console.log()
    this.array = []; // list of exercises to be displayed
  }

  ngOnInit() {
    for(var i in this.exercises){ // add exercises to array to be displayed on this page
      this.array.push(i);
    }
  }

  filteredExercises() {
    // filter through (from search bar) exercises
    this.resetSearch(); 
    this.array = this.array.filter(item => {
      return item.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

  resetSearch() { 
    // reset array of exercises to be displayed back to full list
    this.array = [];
    for(var i in this.exercises){ 
      this.array.push(i);
    }
  }

}
