import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMapsPage } from '../google-maps/google-maps'
import { ContactProvider, Contact } from '../../providers/contact/contact';

/**
 * Generated class for the ContactDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-details',
  templateUrl: 'contact-details.html',
})
export class ContactDetailsPage {

  contact: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public contactProvider: ContactProvider,
  ) {
    this.contact = navParams.get('contact');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactDetailsPage');
  }


  showMap(contact:Contact) {
    this.navCtrl.push(GoogleMapsPage, { 'latLngArray' : [{ lat: contact.latitude, lng: contact.longitude}]});    
  }

  save(contact:Contact) {
    console.log("save: ", contact);
    if (contact.name && contact.name != '') {
      this.contactProvider.save(contact).then(
        ok => {
          this.navCtrl.pop()
        },
        error => {}
      );
      }
  }


}
