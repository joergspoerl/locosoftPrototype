import { Component, Input } from '@angular/core';

import { Nav, Platform } from 'ionic-angular';
import { ToastMessageProvider } from '../../providers/toastMessage/toastMessage'
import { ContactProvider, Contact } from '../../providers/contact/contact';

import { CarSearchPage } from '../../pages/car-search/car-search'
import { AppSettingsPage } from '../../pages/app-settings/app-settings'
import { ContactPage } from '../../pages/contact/contact'
import { GoogleMapsPage } from '../../pages/google-maps/google-maps'
import { TestPage } from '../../pages/test/test'

/**
 * Generated class for the NavigationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'navigation',
  templateUrl: 'navigation.html'
})
export class NavigationComponent {

  @Input() navCtrl: Nav;

  text: string;
  showLastCustomerSearch: boolean = false;
  
  constructor(
    public loadingProvider: ToastMessageProvider,
    public contactProvider: ContactProvider
  ) {
    console.log('Hello NavigationComponent Component');
    this.text = 'Hello World';
    console.log("nav: ", this.navCtrl)
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
        for (let entry of data.docs as any) {
          markers.push({ 
            lat: Number.parseFloat(entry.latitude), 
            lng: Number.parseFloat(entry.longitude)})      
        }
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

  gotoTestPage () {
    this.navCtrl.push(TestPage);
  }


}
