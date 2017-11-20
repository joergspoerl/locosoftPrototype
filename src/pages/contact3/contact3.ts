import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactProvider, Contact } from '../../providers/contact/contact';
import { ContactDetailsPage } from '../contact-details/contact-details'
import { GoogleMapsPage } from '../google-maps/google-maps'
//import { ToastMessageProvider } from '../../providers/toastMessage/toastMessage'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgProgress } from 'ngx-progressbar';
import { DomSanitizer } from '@angular/platform-browser'
import { Observable } from 'rxjs/Observable';

import { VirtualScrollComponent } from 'angular2-virtual-scroll';


@Component({
  selector: 'page-contact3',
  templateUrl: 'contact3.html'
})
export class Contact3Page {

  @ViewChild(VirtualScrollComponent)
  private virtualScroll: VirtualScrollComponent;

  liveSync: any;

  contacts: any[] = [];
  contacts_total_rows: number;
  replication_info: string;
  
  toastSubscription: any;

  type: ContactType = new ContactType();
  typeShort: string;

  testInterval: any;

  constructor(
    public navCtrl: NavController,
    public contactProvider: ContactProvider,
    //public toastMessageProvider: ToastMessageProvider,
    public toastsManager: ToastsManager,
    public ngProgress: NgProgress,
    private sanitizer: DomSanitizer,
    
  ) {

        
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.typeShort = this.type.getTypeShort();
    this.getAllContacts();
    this.getTotalRows();
    
    this.liveSync = this.contactProvider.liveSync().subscribe(
      replication => {
        console.log('replication: ', replication)
        this.replication_info = replication['replication_percent'];
      }
    )


  }

  ionViewDidLeave() {
   this.liveSync.unsubscribe();     
  }


  getAllContacts() {
    this.ngProgress.start();
    this.contactProvider.getAllContacts(this.type.getType()).then(

      result => {
        this.contacts = result.docs

        this.contacts.sort(sort_by('name', false, (s:string)=> {return s.toLowerCase()}));
        this.contacts = Object.assign([], this.contacts)
        //this.virtualScroll.refresh();

        console.log("this.contacts", this.contacts)
        this.ngProgress.done();

        //this.startLiveSync();
      },

      error => {
        console.log("error", error)
        this.ngProgress.done();
      }
    )
  }


  

  search($event) {
    this.getAllContacts();
  }

  clickChangeType() {
    this.type.next()
    this.typeShort = this.type.getTypeShort();
    this.getAllContacts();
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


  add() {
    console.log("add")
    this.navCtrl.push(ContactDetailsPage, { 'contact' : new Contact() });
  }

  removeClick(contact:Contact) {
    this.contacts.splice(this.contacts.findIndex(item => {
      console.log("item: ", item)
      return item._id == contact._id
    }), 1);
    console.log("contacts: ", this.contacts)

    this.contacts = Object.assign([], this.contacts) 
    //this.getAllContacts();
  }

  testRemove () {

    if (!this.testInterval) {
      this.testInterval = setInterval (() => {
        this.contacts.splice(0,1);
        this.contacts = Object.assign([], this.contacts) // copy array -> refresh virtual scroll
        //this.virtualScroll.refresh();
      }, 100)
    } else {
      clearInterval(this.testInterval);
      this.testInterval = null;
    }

  }


  testAdd () {
    
    if (!this.testInterval) {
      this.testInterval = setInterval (() => {
        this.contacts.push({ name: 'Test' + this.contacts.length});
        this.virtualScroll.refresh();
      }, 100)
    } else {
      clearInterval(this.testInterval);
      this.testInterval = null;
    }
    
  }
    


  getTotalRows() {
    this.contactProvider.getTotalRows().then(
      result => {
        this.contacts_total_rows = result.total_rows;
      }
    )

  }

}


export class ContactType {
  type:number = 0;
  types: string[]      = ['contact-example','contact-generated'];
  typesShort: string[] = ['example','generated'];

  next() {
    this.type++;
    if (this.type >= this.types.length)
        this.type = 0;
  }

  getType () {
    return this.types[this.type]
  }
  getTypeShort () {
    console.log("getTypeShort")
    return this.typesShort[this.type]
  }

}


var sort_by = function(field, reverse, primer){
  
     var key = primer ? 
         function(x) {return primer(x[field])} : 
         function(x) {return x[field]};
  
     reverse = !reverse ? 1 : -1;
  
     return function (a:any, b:any) {
         return a = key(a), b = key(b), reverse * (((a > b) as any) - ((b > a) as any));
       } 
  }