import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'

@Component({
  selector: 'app-exercise-info-modal',
  templateUrl: './exercise-info-modal.component.html',
  styleUrls: ['./exercise-info-modal.component.scss'],
})
export class ExerciseInfoModalComponent implements OnInit {
  public name;
  public description;
  public video;
  public category;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  dismissModal(){
    this.modalCtrl.dismiss();
  }

}
