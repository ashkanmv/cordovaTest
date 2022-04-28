import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-app',
  templateUrl: './about-app.page.html',
  styleUrls: ['./about-app.page.scss'],
})
export class AboutAppPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  backButton(){
    this.router.navigate(['/'])
  }

}
