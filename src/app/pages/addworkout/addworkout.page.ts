import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addworkout',
  templateUrl: './addworkout.page.html',
  styleUrls: ['./addworkout.page.scss'],
})
export class AddworkoutPage implements OnInit {
  public form = [
    { val: 'Monday', isChecked:false },
    { val: 'Tuesday', isChecked:false },
    { val: 'Wednesday', isChecked:false },
    { val: 'Thursday', isChecked:false },
    { val: 'Friday', isChecked:false },
    { val: 'Saturday', isChecked:false },
    { val: 'Sunday', isChecked:false },
  ]

  constructor() { }

  ngOnInit() {
  }

}
