import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalesCompareTrackingHourlyPage } from './sales-compare-tracking-hourly.page';

describe('SalesCompareTrackingHourlyPage', () => {
  let component: SalesCompareTrackingHourlyPage;
  let fixture: ComponentFixture<SalesCompareTrackingHourlyPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesCompareTrackingHourlyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalesCompareTrackingHourlyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
