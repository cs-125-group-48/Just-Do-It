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
  public serachTerm;

  public array;


  constructor() {
    this.exercises = data.default;
    this.array = [];
  }

  ngOnInit() {
    this.filteredExercises;
    for(var i in this.exercises){ 
      this.array.push([i, this.exercises[i]]);
    }
  }

  filteredExercises() {
    console.log(typeof(this.exercises));
    this.exercises = this.exercises.filter(item => {
      return item.name.toLowerCase().indexOf(this.serachTerm.toLowerCase()) > -1;
    });
  }

}
