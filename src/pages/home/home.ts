import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CarSearchPage } from '../car-search/car-search'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  showLastSearch: boolean = false;

  constructor(public navCtrl: NavController) {

  }

  gotoCarSearch () {
    this.navCtrl.push(CarSearchPage);
  }
}
