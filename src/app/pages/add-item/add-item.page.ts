import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  backButton() {
    this.router.navigate(['/']);
  }
}
