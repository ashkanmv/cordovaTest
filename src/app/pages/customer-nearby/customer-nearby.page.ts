import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-nearby',
  templateUrl: './customer-nearby.page.html',
  styleUrls: ['./customer-nearby.page.scss'],
})
export class CustomerNearbyPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  backButton() {
    this.router.navigate(['/']);
  }
 
  
}
