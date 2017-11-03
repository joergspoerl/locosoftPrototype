import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CarSearchPage } from '../car-search/car-search'
import { AppSettingsPage } from '../app-settings/app-settings'

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

  gotoAppSettings () {
    this.navCtrl.push(AppSettingsPage);
  }
}
