import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  backButton(){
    this.router.navigate(['/'])
  }
  show = false;
  showPassword(input){
    if(this.show == true){
      this.show = false;
      input.type = 'password'
    }else {
      this.show = true;
      input.type = 'text'
    }
  }
}
