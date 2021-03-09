// Workout Page: Page that contains the users current workout to be completed (with video)

import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.page.html',
  styleUrls: ['./workout.page.scss'],
})
export class WorkoutPage implements OnInit {
  private videoUrl: string;
  private service:StorageService;

  public workoutId: string; // pass in?

  constructor(private storageService:StorageService) { 
    this.service = storageService;
  }

  ngOnInit() {
    let event = this.service.getEvent(new Date()/*dateofevent*/);
    

  }
  
  // have something on home/calendar page to indicate which event to do
  // based on date/eventid?

}
