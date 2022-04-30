import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-history',
  templateUrl: './customer-history.page.html',
  styleUrls: ['./customer-history.page.scss'],
})
export class CustomerHistoryPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  backButton(){
    this.router.navigate(['/main'])
  }
}
