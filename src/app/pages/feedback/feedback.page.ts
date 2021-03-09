// Feedback Page: Page that loads once user checks complete on their workout

import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { UserDifficulty } from 'src/app/data/UserDifficulty';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  public service:StorageService;
  public feedback:string;
  public fitnessLevel:string;
  public muscle_group:string;

  constructor(private storageService:StorageService) { 
    this.service = storageService;
  }

  ngOnInit() {
  }

  async click() {
    // TODO: bug where this doesn't update the profile page
    // this.service.getFitness().then((result) => {
    //   this.fitnessLevel = (parseInt(result.toString()) + parseInt(this.feedback)).toString();
    //   console.log(this.fitnessLevel);
    //   this.service.updateFitness(this.fitnessLevel);
    // });
    var difficulty = await this.service.getUserDifficulty();

    //difficulty. += Number(this.feedback);


  }

}
