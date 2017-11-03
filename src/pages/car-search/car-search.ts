import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CarSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-car-search',
  templateUrl: 'car-search.html',
})
export class CarSearchPage {

  searchCategory:any;
  searchFilter:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarSearchPage');

    this.searchCategory = 'email';
    this.searchFilter = 'kunden';
  }

}
