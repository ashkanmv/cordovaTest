import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreCardService } from './score-card.service';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.page.html',
  styleUrls: ['./score-card.page.scss'],
})
export class ScoreCardPage implements OnInit {
  IsDetailsShowing = false;
  IsDCDDetailsShowing = false;
  selectedSegment: string = 'category';
  categories2 = [];
  skus2 = [];
  scorecards2 = [];
  selected_category2 = [];
  selected_sku2 = [];
  channels3 = [];
  scorecards3 = [];
  selected_channel3 = [];
  categories4 = [];
  skus4 = [];
  scorecards4 = [];
  selected_category4 = [];
  selected_sku4 = [];
  today : string;
  constructor(private router: Router,
    private scoreCardService: ScoreCardService) { }

  ngOnInit() {
    this.getToday()
  }

  getToday() {
    this.scoreCardService.getToday().subscribe(today =>{
      this.today = today;
      this.getChannels1()
    })
  }

  getChannels1(){
    this.scoreCardService.getChannels()
      .subscribe(data=>console.log(data))
  }

  // Show_Category() {
  //   this.hide_chart();
  //   if (!this.first_section_data)
  //     this.get_channels1();

  // }

  segmentChanged(event: any) {
    // console.log(event.target.value);
    this.selectedSegment = event.target.value;
  }
  toggleDtails() {
    this.IsDetailsShowing = !this.IsDetailsShowing;
  }
  toggleDtailsDCD() {
    this.IsDCDDetailsShowing = !this.IsDCDDetailsShowing;
  }
}
