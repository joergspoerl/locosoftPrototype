import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactProvider, Contact } from '../../providers/contact/contact';
import { ContactDetailsPage } from '../contact-details/contact-details'
import { GoogleMapsPage } from '../google-maps/google-maps'
import { ToastMessageProvider } from '../../providers/toastMessage/toastMessage'
//import { ToastController } from 'ionic-angular';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgProgress } from 'ngx-progressbar';



@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  contacts: any;

  constructor(
    public navCtrl: NavController,
    public contactProvider: ContactProvider,
    public loadingProvider: ToastMessageProvider,
    public ngProgress: NgProgress
    
  ) {

        
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.getAllContacts()    
  }

  getAllContacts() {
    this.ngProgress.start();
    this.contactProvider.getAllContacts().then(

      result => {
        this.contacts = result.docs;
        console.log("this.contacts", this.contacts)
        this.ngProgress.done();
      },

      error => {
        console.log("error", error)
        this.ngProgress.done();
      }
    )
  }

  gotoContactDetails(contact) {
    this.navCtrl.push(ContactDetailsPage, { 'contact' : contact });
  }

  showMap() {
    var markers = [];
    for (let entry of this.contacts) {
      markers.push({ 
        lat: Number.parseFloat(entry.latitude), 
        lng: Number.parseFloat(entry.longitude)})      
    }
    console.log("markers", markers)
    this.navCtrl.push(GoogleMapsPage, { 'latLngArray': markers });
  }

  showContactMap(contact) {
    this.navCtrl.push(GoogleMapsPage, { 'latLngArray' : [{ lat: contact.latitude, lng: contact.longitude}]});    
  }


  add() {
    console.log("add")
    this.navCtrl.push(ContactDetailsPage, { 'contact' : new Contact() });
  }

  remove(contact:Contact) {
    this.contactProvider.remove(contact).then(
      ok => {
        this.getAllContacts();
      },
      er => {
        console.log("Error: ", er);
      }
    );   
  }


}

