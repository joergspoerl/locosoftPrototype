import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CarSearchPage } from '../car-search/car-search'
import { AppSettingsPage } from '../app-settings/app-settings'
import { ContactPage } from '../contact/contact'
import { GoogleMapsPage } from '../google-maps/google-maps'
import { LoadingProvider } from '../../providers/loading/loading'
import { ContactProvider, Contact } from '../../providers/contact/contact';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  showLastSearch: boolean = false;

  constructor(
    public navCtrl: NavController,
    public loadingProvider: LoadingProvider,
    public contactProvider: ContactProvider
  ){

  }

  gotoCarSearch () {
    this.navCtrl.push(CarSearchPage);
  }

  gotoCustomerRadar () {

    this.loadingProvider.show("Loading, please wait ...")
    let contact;
    this.contactProvider.getAllContactsStatic().subscribe (
      data => {
        this.loadingProvider.hide();
        var markers = [];
        for (let entry of data.json()) {
          markers.push({ lat: entry.latitude, lng: entry.longitude})      
        }
        console.log("markers", markers)
        this.navCtrl.push(GoogleMapsPage, { 'latLngArray': markers });
      },
      error => this.loadingProvider.hide()
    )

  }

  gotoAppSettings () {
    this.navCtrl.push(AppSettingsPage);
  }

  gotoContact () {
    this.navCtrl.push(ContactPage);
  }
}
