// HomePage: home page for user that shows next workout

import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public name:string;

  constructor(private storageService:StorageService) {
    this.storageService.getUserProfile().then((result) => {
      // get name from storage
      this.name = result.name;
      
    });
  }

}
