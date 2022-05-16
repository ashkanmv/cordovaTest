import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer-historytory',
  templateUrl: './customer-historytory.page.html',
  styleUrls: ['./customer-historytory.page.scss'],
})
export class CustomerHistorytoryPage implements OnInit {
  customerInfo:   {
    shopName:string ,
    shopCode: number,
    shopType:string,
    tell: number,
    sr:string,
    address:string
  }
  constructor(private router : Router) {    
    this.customerInfo={
      shopName:'Jahan Akbary',
      shopCode: 21632297 ,
      shopType:'A',
      tell: 98912388 ,
      sr:'Saeed Rostamy',
      address:'Tehran_Zafar'
} }

  ngOnInit() {
  }
  backButton(){
    this.router.navigate(['/'])
  }
}
