import { Component, Input } from '@angular/core';

import { Nav, Platform } from 'ionic-angular';
import { ContactProvider, Contact, ContactMeta } from '../../providers/contact/contact';

import { CarSearchPage } from '../../pages/car-search/car-search'
import { AppSettingsPage } from '../../pages/app-settings/app-settings'
import { ContactPage } from '../../pages/contact/contact'
import { GoogleMapsPage } from '../../pages/google-maps/google-maps'
import { TestPage } from '../../pages/test/test'
import { NgProgress } from 'ngx-progressbar';

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
    public contactProvider: ContactProvider,
    public ngProgress: NgProgress
    
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
    this.ngProgress.start()
    let contact;
    this.contactProvider.getAllContacts(new ContactMeta().type[0]).then (
      data => {
        this.ngProgress.done()
        var markers = [];
        for (let entry of data.docs as any) {
          markers.push({ 
            lat: Number.parseFloat(entry.latitude), 
            lng: Number.parseFloat(entry.longitude)})      
        }
        this.navCtrl.push(GoogleMapsPage, { 'latLngArray': markers });
      },
      error =>     this.ngProgress.done()
      
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
