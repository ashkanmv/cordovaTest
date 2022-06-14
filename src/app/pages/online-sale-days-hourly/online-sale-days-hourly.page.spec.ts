import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnlineSaleDaysHourlyPage } from './online-sale-days-hourly.page';

describe('OnlineSaleDaysHourlyPage', () => {
  let component: OnlineSaleDaysHourlyPage;
  let fixture: ComponentFixture<OnlineSaleDaysHourlyPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineSaleDaysHourlyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnlineSaleDaysHourlyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
