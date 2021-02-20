import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  public service:StorageService;
  public feedback:string;
  public fitnessLevel:string;

  constructor(private storageService:StorageService) { 
    this.service = storageService;
  }

  ngOnInit() {
  }

  click() {
    // TODO: bug where this doesn't update the profile page
    this.service.getFitness().then((result) => {
      this.fitnessLevel = (parseInt(result.toString()) + parseInt(this.feedback)).toString();
      console.log(this.fitnessLevel);
      this.service.updateFitness(this.fitnessLevel);
    });

  }

}
