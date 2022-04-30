import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VariableRadiusPieChartsComponent } from './variable-radius-pie-charts.component';

describe('VariableRadiusPieChartsComponent', () => {
  let component: VariableRadiusPieChartsComponent;
  let fixture: ComponentFixture<VariableRadiusPieChartsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableRadiusPieChartsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VariableRadiusPieChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
