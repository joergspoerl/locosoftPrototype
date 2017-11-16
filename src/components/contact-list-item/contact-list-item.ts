import { Component, ViewChild, Input, Output } from '@angular/core';
import { ContactProvider, Contact } from '../../providers/contact/contact';
import { EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Item } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular/components/item/item-sliding';

import { ContactDetailsPage } from '../../pages/contact-details/contact-details'
import { GoogleMapsPage } from '../../pages/google-maps/google-maps'

/**
 * Generated class for the ContactListItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'contact-list-item',
  templateUrl: 'contact-list-item.html'
})
export class ContactListItemComponent {
  @ViewChild(ItemSliding) item: ItemSliding;  
  @Input() contact: Contact;
  @Output() removeClick = new EventEmitter<Contact>();
  @Output() showMapClick = new EventEmitter<Contact>();
  @Output() callClick = new EventEmitter<Contact>();
  
  constructor(
    private contactProvider: ContactProvider,
    private navCtrl: NavController,
  ) {
    console.log('Hello ContactListItemComponent Component');
  }

  gotoContactDetails(contact) {
    this.navCtrl.push(ContactDetailsPage, { 'contact' : contact });
  }

  remove () {
    this.item.close();

    this.contactProvider.remove(this.contact).then(
      ok => {
        this.removeClick.next(this.contact);
      },
      er => {
        console.log("Error: ", er);
      }
    );   
  }

  showMap () {
    this.item.close();

    this.navCtrl.push(GoogleMapsPage, 
      { 'latLngArray' : [{ lat: this.contact.latitude, lng: this.contact.longitude}]}
    );    
    
  }

  call () {
    this.item.close();
  }

}
