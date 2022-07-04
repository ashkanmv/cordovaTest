import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Language } from 'src/app/shared/common';
import { LanguageService } from 'src/app/shared/language.service';
import { SharedService } from 'src/app/shared/shared.service';
import { UtilService } from 'src/app/shared/util.service';
import { ScoreCardService } from './score-card.service';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.page.html',
  styleUrls: ['./score-card.page.scss'],
})
export class ScoreCardPage implements OnInit {
  categoryRadio: 1 | 2 = 1;
  channelRadio: 1 | 2 = 1;
  categoryPRadio: 1 | 2 = 1;
  channelPRadio: 1 | 2 = 1;
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
  selected_channel3: any = [];
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
  // old rys
  type1 = "sales";
  server;
  selected_ch3=[];
  type3 = "sales";

  color = [
    'rgba(230,25,75,0.2)',
    'rgba(60,180,75,0.2)',
    'rgba(255,225,25,0.2)',
    'rgba(67,99,216 ,0.2)',
    'rgba(245,130,49 ,0.2)',
    'rgba(145,30,180,0.2)',
    'rgba(70,240,240,0.2)',
    'rgba(240,50,230,0.2)',
    'rgba(188,246,12,0.2)',
    'rgba(250,190,190,0.2)',
    'rgba(0,128,128,0.2)',
    'rgba(230,190,255,0.2)',
    'rgba(154,99,36,0.2)',
    'rgba(255,250,200,0.2)',
    'rgba(128,0,0,0.2)',
    'rgba(255,250,200,0.2)',
    'rgba(170,255,195,0.2)',
    'rgba(128,128,0,0.2)',
    'rgba(0,0,117,0.2)',
    'rgba(128,128,128,0.2)',
    'rgba(255,255,255,0.2)',
    'rgba(0,0,0,0.2)',

  ];

  public get language(): Language {
    return this.languageService.language;
  }

  public get isOnline(){
    return this.sharedService.isOnline;
  }
  constructor(
    private utilService : UtilService,
    private scoreCardService: ScoreCardService,
    private loadingCtrl: LoadingController,
    private languageService: LanguageService,
    private sharedService : SharedService
  ) { }
  // old rys
  set_server_status(vale) {
    this.server = vale;
    this.utilService.set_server(vale);
  }

  ngOnInit() {
    this.getToday();
  }

  //Sec 1
  getToday() {
    this.scoreCardService.getToday().subscribe((today) => {
      this.today = today;
      this.getChannels1();
    });
  }

  Show_Category() {
    if (!this.first_section_data) this.getChannels1();
  }

  async getChannels1() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.scoreCardService.getChannels().subscribe((channels) => {
      this.channels1 = channels.map(c=>{
        return {
          GPSChannel : c.GPSChannel,
          order : c.order,
          group: this.language.Score_Card.group
        }
      });
      this.channels3 = channels;
      channels.forEach((channel, i) => {
        this.selected_channel1.push(channel.GPSChannel);
        this.selected_channel3.push(channel.GPSChannel);
        this.ms_data_channel.push({
          id: i,
          itemName: channels[i].GPSChannel,
          group: this.language.Score_Card.group,
        });
        this.ms_model_channel = this.ms_data_channel;
        this.selected_category_data = this.ms_data_channel;
        loading.dismiss();
      });
      this.getSales1ByChannel();
    });
  }

  async getSales1ByChannel() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.scoreCardService.getSales1ByChannel(this.selected_channel1.join()).subscribe((scorecard) => {
      if (scorecard.length) {
        this.create_total_model1(scorecard);
        this.first_section_data = scorecard;
      }
      loading.dismiss();
    });
  }

  async getPped1ByChannel() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    loading.present();
    this.scoreCardService.getPped1ByChannel(this.selected_channel1.join()).subscribe(
      (scorecard) => {
        this.create_total_model1(scorecard);
        loading.dismiss();
      }
    );
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
      index: 0,
    };
    this.scorecards1.push(keys);
    this.virtual_rows1.push(v_row);
    let index = 1;
    for (var i = 0; i < model.length; i++) {
      let ch = model[i];
      let temp = Object.keys(ch).map((key) => ch[key]);
      for (var j = 1; j < temp.length; j++) {
        if (temp[j] != null) {
          temp[j] = parseFloat(temp[j]).toFixed(2);
        }
      }
      this.scorecards1.push(temp);
      let v_row1 = {
        type: 'a',
        show: true,
        index: index,
      };
      index++;
      this.scorecards1.push(temp);
      this.virtual_rows1.push(v_row1);
      let v_row2 = {
        type: 'b',
        show: false,
        index: index,
      };
      index++;
      this.virtual_rows1.push(v_row2);
    }
  }

  categorySection() {
    if (this.categoryRadio == 1)
      this.getSales1ByChannel();
    else
      this.getPped1ByChannel();
  }

  // SEC 2
  IsFilterLoaded = false;
  second_section_data;
  Show_Channel() {
    if (this.IsFilterLoaded != true) {
      this.Fill_Categroy_Sku_Filters().then((data) => {
        if (!this.second_section_data) this.get_categories2(); //make it serial
      });
    } else {
      if (!this.second_section_data) this.get_categories2(); //make it serial
    }
  }

  async categorySelect2() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.skus2 = [];
    this.scoreCardService.getSkusByCategory(this.selected_category2.join()).subscribe(
      (skus) => {
        this.skus2.push.apply(this.skus2, skus);
        loading.dismiss();
      }
    );
  }

  async getPped2ByCatSku() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.scoreCardService.getPped2ByCatSku(this.selected_category2.join(), this.selected_sku2.join())
      .subscribe(
        scorecard => {
          this.create_model2(scorecard);
          loading.dismiss();
        });
  }

  async get_categories2() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.scoreCardService.getSales2ByCatSku(this.selected_category2.join(), this.selected_sku2.join()).subscribe(
      scorecard2 => {
        this.create_model2(scorecard2);
        loading.dismiss();
        this.second_section_data = scorecard2;
      },
      (error) => (this.second_section_data = undefined)
    );
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
      this.scorecards2.push(keys);
      for (var i = 0; i < model.length; i++) {
        let ch = model[i];
        let temp = Object.keys(ch).map((key) => ch[key]);
        for (var j = 1; j < temp.length; j++) {
          if (temp[j] != null) {
            temp[j] = parseFloat(temp[j]).toFixed(2);
          }
        }
        this.scorecards2.push(temp);
      }
    }
  }

  channelSectionSkus() {
    if (this.channelRadio == 1)
      this.get_categories2();
    else
      this.getPped2ByCatSku();
  }

  // Sec 3
  chart_data1 = [];
  virtual_rows3 = [];
  third_section_data;
  columns1 = [];
  data1 = [];
  columns2 = [];
  data2 = [];
  async show_Category_Percent() {
    if (this.third_section_data) {
      this.create_chart3();
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.scoreCardService.getSales3ByChannel(this.selected_channel3.join())
      .subscribe(
        (scorecard3: any) => {
          this.chart_data1 = scorecard3;
          loading.dismiss();
          this.create_total_model3(scorecard3);
          this.third_section_data = scorecard3;
          this.create_chart3();
        },
        error => this.third_section_data = undefined);

  }

  create_total_model3(model) {
    this.scorecards3 = [];
    this.virtual_rows3 = [];
    let keys = Object.keys(model[0]);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] == 'Today%') {
        keys[i] = this.today + '%';
      }
    }
    let v_row = {
      type: 'h',
      show: true,
      index: 0
    }
    this.scorecards3.push(keys);
    this.virtual_rows3.push(v_row);
    let index = 1;
    for (var i = 0; i < model.length; i++) {
      let ch = model[i];
      let temp = Object.keys(ch).map(key => ch[key]);
      for (var j = 1; j < temp.length; j++) {
        if (temp[j] != null) {
          temp[j] = parseFloat(temp[j]).toFixed(2);
        }

      }
      this.scorecards3.push(temp);
      let v_row1 = {
        type: 'a',
        show: true,
        index: index
      }
      index++;
      this.scorecards3.push(temp);
      this.virtual_rows3.push(v_row1);
      let v_row2 = {
        type: 'b',
        show: false,
        index: index
      }
      index++;
      this.virtual_rows3.push(v_row2);
    }
  }

  create_chart3() {
    let model = this.chart_data1;
    let format_model = [];
    for (var i = 0; i < model.length; i++) {
      let ch = model[i];
      let temp = Object.keys(ch).map(key => ch[key]);
      for (var j = 1; j < temp.length; j++) {
        if (temp[j] != null) {
          temp[j] = parseFloat(temp[j]).toFixed(2);
        }

      }
      format_model.push(temp);
    }
    let labels = [];
    let colors = [];
    let valus31 = [];
    let valus32 = [];
    let data = []
    let data2 = []
    for (var i = 0; i < format_model.length; i++) {
      data.push({
        name: format_model[i][0],
        data: +format_model[i][1]
      })
      data2.push({
        name: format_model[i][0],
        data: +format_model[i][2]
      })
      labels.push(format_model[i][0]);
      valus31.push(format_model[i][1]);
      valus32.push(format_model[i][2]);
      colors.push(this.color[i]);
    }

    this.columns1 = labels;
    this.columns2 = labels;
    this.data1 = data;
    this.data2 = data2;
    // let ctx31 = this.canvas1.nativeElement
    // let ctx32 = this.canvas2.nativeElement
    // new Chart(ctx31, {
    //   type: 'pie',
    //   data: data31,
    //   options: {}

    // });
    // new Chart(ctx32, {
    //   type: 'pie',
    //   data: data32,
    //   options: {}

    // });
    //your code to be executed after 1 second
  }

  categoryPSection() {
    if (this.categoryRadio == 1)
      this.getSales3ByChannel();
    else
      this.getPped3ByChannel();
  }

  async getPped3ByChannel() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.scoreCardService.getPped3ByChannel(this.selected_channel3.join()).subscribe(
      (scorecard: any) => {
        this.create_total_model3(scorecard);
        this.chart_data1 = scorecard;
        this.create_chart3();
        loading.dismiss();
      });
  }

  async getSales3ByChannel() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.scoreCardService.getSales3ByChannel(this.selected_channel3.join())
      .subscribe(
        (scorecard: any) => {
          this.create_total_model3(scorecard);
          this.chart_data1 = scorecard;
          this.create_chart3();
          loading.dismiss();
        });
  }

  // SEC 4
  chart_data2 = [];
  fourth_section_data;
  columns3 = [];
  data3 = [];
  columns4 = [];
  data4 = [];
  async Show_Channel_Percent() {
    if (this.fourth_section_data) {
      this.create_chart4();
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.Fill_Categroy_Sku_Filters().then((data) => {
      this.scoreCardService.getSales4ByCatSku(this.selected_category4.join(), this.selected_sku4.join()).subscribe(
        (scorecard: any) => {
          this.create_model4(scorecard);
          this.chart_data2 = scorecard;
          loading.dismiss();
          this.fourth_section_data = scorecard;
          this.create_chart4();
        });
    });

  }

  create_model4(model) {
    this.scorecards4 = [];
    if (model[0]) {
      let keys = Object.keys(model[0]);
      for (var i = 0; i < keys.length; i++) {
        if (keys[i] == "Today%") {
          keys[i] = this.today + "%";
        }
      }
      this.scorecards4.push(keys);
      for (var i = 0; i < model.length; i++) {
        let ch = model[i];
        let temp = Object.keys(ch).map((key) => ch[key]);
        for (var j = 1; j < temp.length; j++) {
          if (temp[j] != null) {
            temp[j] = parseFloat(temp[j]).toFixed(2);
          }
        }
        this.scorecards4.push(temp);
      }
    }
  }

  create_chart4() {

    let model = this.chart_data2;
    let format_model = [];
    for (var i = 0; i < model.length; i++) {
      let ch = model[i];
      let temp = Object.keys(ch).map((key) => ch[key]);
      for (var j = 1; j < temp.length; j++) {
        if (temp[j] != null) {
          temp[j] = parseFloat(temp[j]).toFixed(2);
        }
        if (temp[j] == null) {
          temp[j] = 0;
        }
      }
      format_model.push(temp);
    }
    let labels = [];
    let colors = [];
    let valus41 = [];
    let valus42 = [];
    let data = []
    let data2 = []
    for (var i = 0; i < format_model.length; i++) {
      data.push({
        name: format_model[i][0],
        data: +format_model[i][1]
      })
      data2.push({
        name: format_model[i][0],
        data: +format_model[i][2]
      })
      labels.push(format_model[i][0]);
      valus41.push(format_model[i][1]);
      valus42.push(format_model[i][2]);
      colors.push(this.color[i]);
    }

    this.columns3 = labels;
    this.columns4 = labels;
    this.data3 = data;
    this.data4 = data2;
  }

  async categorySelect4() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.skus4 = [];
    this.scoreCardService.getSkusByCategory(this.selected_category4.join())
      .subscribe(skus => {
        this.skus4.push.apply(this.skus4, skus);
        loading.dismiss();
      });
  }

  channelPSectionSkus() {
    if (this.channelPRadio == 1)
      this.getSales4ByCatSku()
    else this.getPped4ByCatSku()
  }

  async getSales4ByCatSku() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.scoreCardService.getSales4ByCatSku(this.selected_category4.join(), this.selected_sku4.join())
      .subscribe((scorecard: any) => {
        this.create_model4(scorecard);
        this.chart_data2 = scorecard;
        this.create_chart4();
        loading.dismiss();
      });
  }

  async getPped4ByCatSku() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    this.scoreCardService.getPped4ByCatSku(this.selected_category4.join(), this.selected_sku4.join())
      .subscribe((scorecard: any) => {
        this.create_model4(scorecard);
        this.chart_data2 = scorecard;
        this.create_chart4();
        loading.dismiss();
      });
  }

  Fill_Categroy_Sku_Filters(): Promise<any> {
    return new Promise((resolve) => {
      {
        this.scoreCardService.getCategories().subscribe(
          (categories) => {
            this.categories2 = categories.map(c=>{
              return {
                Cat: c.Cat,
                group: this.language.Score_Card.group
              }
            });
            
            this.categories4 = categories;
            categories.forEach((category, i) => {
              this.selected_category2.push(category.Cat);
              this.selected_category4.push(category.Cat);
              this.sec4CategorySelect.push({
                id: i,
                itemName: category.Cat,
                group: this.language.Score_Card.group,
              });
            });
            this.sec2CategorySelect = this.sec4CategorySelect;
            this.scoreCardService.getSkusByCategory(this.selected_category2.join()).subscribe(
              (skus) => {
                this.skus2.push.apply(this.skus2, skus);
                this.skus4.push.apply(this.skus4, skus);
                skus.forEach((sku, i) => {
                  this.selected_sku2.push(sku.SKU);
                  this.selected_sku4.push(sku.SKU);
                  this.sec4SkuSelect.push({ id: i, itemName: sku.SKU, group: this.language.Score_Card.group, });
                });

                this.sec2SkuSelect = this.sec4SkuSelect;
                this.IsFilterLoaded = true;
                resolve(true);
              },
              (error) => resolve(false)
            );
          },
          (error) => resolve(false)
        );
      }
    });
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.target.value;
    switch (this.selectedSegment) {
      case 'category':
        this.Show_Category();
        break;
      case 'channel':
        this.Show_Channel();
        break;
      case 'categoryP':
        this.show_Category_Percent();
        break;
      case 'channelP':
        this.Show_Channel_Percent();
        break;
    }
  }

  // toggleDtails() {
  //   this.IsDetailsShowing = !this.IsDetailsShowing;
  // }

  // toggleDtailsDCD() {
  //   this.IsDCDDetailsShowing = !this.IsDCDDetailsShowing;
  // }
  categorySectionChanged() {
    if (this.categoryRadio == 1)
      this.getSales1ByChannel();
    else
      this.getPped1ByChannel();
  }

  
}
