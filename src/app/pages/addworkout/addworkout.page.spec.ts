import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddworkoutPage } from './addworkout.page';

describe('AddworkoutPage', () => {
  let component: AddworkoutPage;
  let fixture: ComponentFixture<AddworkoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddworkoutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddworkoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
