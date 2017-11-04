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

  showLastCustomerSearch: boolean = false;

  constructor(
    public navCtrl: NavController,
    public loadingProvider: LoadingProvider,
    public contactProvider: ContactProvider
  ){

  }

  showLastCustomerSearchClick ($event) {
    $event.stopPropagation(); //THIS DOES THE MAGIC
    this.showLastCustomerSearch = !this.showLastCustomerSearch
  }
  gotoCarSearch () {
    this.navCtrl.push(CarSearchPage);
  }

  gotoCustomerRadar () {

    this.loadingProvider.show("Loading, please wait ...")
    let contact;
    this.contactProvider.getAllContacts().then (
      data => {
        this.loadingProvider.hide();
        var markers = [];
        for (let entry of data.docs) {
          var t = entry as Contact;
          console.log("t",t)
          markers.push({ lat: t.latitude, lng: t.longitude})      
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
