import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-history',
  templateUrl: './customer-history.component.html',
  styleUrls: ['./customer-history.component.scss'],
})
export class CustomerHistoryComponent implements OnInit {
  
  customerInfo:   {
    shopName:string ,
    shopCode: number,
    shopType:string,
    tell: number,
    sr:string,
    address:string
  }
  constructor() {
    this.customerInfo={
      shopName:'Jahan Akbari',
      shopCode:21632297,
      shopType:'A',
      tell:0912,
      sr:'Saeed Rostami',
      address:'Tehran_Zafar'
  }
   }

  ngOnInit() {}

}
