import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
  sec2SkuSelect = [];
  channels1 = [];
  channels3 = [];
  scorecards3 = [];
  selected_channel1 = [];
  selected_channel3 = [];
  ms_data_channel = [];
  categories4 = [];
  skus4 = [];
  scorecards4 = [];
  selected_category4 = [];
  selected_sku4 = [];
  today: string;
  ms_model_channel = [];
  selected_category_data = [];
  first_section_data = [];
  scorecards1 = [];
  virtual_rows1 = [];
  sec4CategorySelect = [];
  sec4SkuSelect = [];
  sec2CategorySelect = [];
  constructor(private router: Router,
    private scoreCardService: ScoreCardService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getToday()
  }

  //Sec 1
  getToday() {
    this.scoreCardService.getToday().subscribe(today => {
      this.today = today;
      this.getChannels1();
    })
  }

  async getChannels1() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.scoreCardService.getChannels()
      .subscribe(channels => {
        this.channels1 = channels;
        this.channels3 = channels;
        channels.forEach((channel, i) => {
          this.selected_channel1.push(channel.GPSChannel);
          this.selected_channel3.push(channel.GPSChannel);
          this.ms_data_channel.push({
            "id": i,
            "itemName": channels[i].GPSChannel
          });
          this.ms_model_channel = this.ms_data_channel;
          this.selected_category_data = this.ms_data_channel;
          loading.dismiss();
        });
        this.getSales1ByChannel();
      })
  }

  getSales1ByChannel() {
    this.scoreCardService.getSales1ByChannel(this.selected_channel1.join())
      .subscribe(
        scorecard => {
          if (scorecard.length) {
            this.create_total_model1(scorecard);
            this.first_section_data = scorecard;
          }
        });
  }

  create_total_model1(model) {
    this.scorecards1 = [];
    this.virtual_rows1 = [];
    let keys = Object.keys(model[0]);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] == 'Today') {
        keys[i] = this.today;
      }
    }
    let v_row = {
      type: 'h',
      show: true,
      index: 0
    }
    this.scorecards1.push(keys);
    this.virtual_rows1.push(v_row);
    let index = 1;
    for (var i = 0; i < model.length; i++) {
      let ch = model[i];
      let temp = Object.keys(ch).map(key => ch[key]);
      for (var j = 1; j < temp.length; j++) {
        if (temp[j] != null) {
          temp[j] = parseFloat(temp[j]).toFixed(2);
        }

      }
      this.scorecards1.push(temp);
      let v_row1 = {
        type: 'a',
        show: true,
        index: index
      }
      index++;
      this.scorecards1.push(temp);
      this.virtual_rows1.push(v_row1);
      let v_row2 = {
        type: 'b',
        show: false,
        index: index
      }
      index++;
      this.virtual_rows1.push(v_row2);
    }
  }

  // SEC 2
  IsFilterLoaded = false;
  second_section_data = []
  Show_Channel() {
    if (this.IsFilterLoaded != true) {
      this.Fill_Categroy_Sku_Filters().then(data => {
        if (!this.second_section_data)
          this.get_categories2();
      });
    }
    else {
      if (!this.second_section_data)
        this.get_categories2();
      //make it serial
    }
  }

  Fill_Categroy_Sku_Filters(): Promise<any> {
    return new Promise(resolve => {
      {
        this.scoreCardService.getCategories()
          .subscribe(
            categories => {
              this.categories2 = categories;
              this.categories4 = categories;
              categories.forEach((category, i) => {
                this.selected_category2.push(category.Cat);
                this.selected_category4.push(category.Cat);
                this.sec4CategorySelect.push({
                  "id": i,
                  "itemName": category.Cat
                });
              });

              this.sec2CategorySelect = this.sec4CategorySelect;
              this.scoreCardService.getSkusByCategory(this.selected_category2.join())
                .subscribe(
                  skus => {
                    this.skus2.push.apply(this.skus2, skus);
                    this.skus4.push.apply(this.skus4, skus);
                    skus.forEach((sku , i) => {
                      this.selected_sku2.push(sku.SKU);
                      this.selected_sku4.push(sku.SKU);
                      this.sec4SkuSelect.push({
                        "id": i,
                        "itemName": sku.SKU
                      });
                    });

                    this.sec2SkuSelect = this.sec4SkuSelect;
                    this.IsFilterLoaded = true;
                    resolve(true);
                  }, error => resolve(false));
            },
            error => resolve(false));
      }
    })
  }

  async get_categories2() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.scoreCardService.getSales2ByCatSku(this.selected_category2.join(), this.selected_sku2.join())
      .subscribe(
        (scorecard2: Data[]) => {
          console.log(scorecard2);

          this.create_model2(scorecard2);
          loading.dismiss();
          this.second_section_data = scorecard2;
        },
        error => this.second_section_data = undefined);
  }

  create_model2(model) {
    this.scorecards2 = [];
    if (model[0]) {
      let keys = Object.keys(model[0]);
      for (var i = 0; i < keys.length; i++) {
        if (keys[i] == 'Today') {
          keys[i] = this.today;
        }
      }
      this.scorecards2.push(keys)
      for (var i = 0; i < model.length; i++) {
        let ch = model[i];
        let temp = Object.keys(ch).map(key => ch[key]);
        for (var j = 1; j < temp.length; j++) {
          if (temp[j] != null) {
            temp[j] = parseFloat(temp[j]).toFixed(2);
          }

        }
        this.scorecards2.push(temp);
      }
    }

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
