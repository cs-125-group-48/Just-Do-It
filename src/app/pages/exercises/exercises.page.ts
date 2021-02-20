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
    this.exercises = data.default;
    console.log()
    this.array = [];
  }

  ngOnInit() {
    this.filteredExercises;
    for(var i in this.exercises){ 
      this.array.push(i);
    }
    // console.log(this.array)
  }

  filteredExercises() {
    // console.log(this.searchTerm);
    this.array = this.array.filter(item => {
      return item.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

  resetSearch() {
    this.array = [];
    for(var i in this.exercises){ 
      this.array.push(i);
    }
  }

  test() {

  }

}
