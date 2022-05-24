import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodayPlannedNotBuyingPage } from './today-planned-not-buying.page';

describe('TodayPlannedNotBuyingPage', () => {
  let component: TodayPlannedNotBuyingPage;
  let fixture: ComponentFixture<TodayPlannedNotBuyingPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayPlannedNotBuyingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodayPlannedNotBuyingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
