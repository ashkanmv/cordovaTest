import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer-historytory',
  templateUrl: './customer-historytory.page.html',
  styleUrls: ['./customer-historytory.page.scss'],
})
export class CustomerHistorytoryPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  backButton(){
    this.router.navigate(['/'])
  }
}
