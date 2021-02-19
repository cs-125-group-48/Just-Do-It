import { Component, OnInit } from '@angular/core';
import * as data from 'Exercises Metadata/Metadata.json';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})

export class ExercisesPage implements OnInit {
  public exercises = data.default;
  constructor() {

  }

  ngOnInit() {
  }

  test(){
    console.log("a");
  }

}
