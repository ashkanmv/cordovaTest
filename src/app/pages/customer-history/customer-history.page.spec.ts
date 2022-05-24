import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerHistoryPage } from './customer-history.page';

describe('CustomerHistoryPage', () => {
  let component: CustomerHistoryPage;
  let fixture: ComponentFixture<CustomerHistoryPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerHistoryPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerHistoryPage);



