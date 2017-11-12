import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactProvider, Contact } from '../../providers/contact/contact';
import { ContactDetailsPage } from '../contact-details/contact-details'
import { GoogleMapsPage } from '../google-maps/google-maps'
//import { ToastMessageProvider } from '../../providers/toastMessage/toastMessage'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgProgress } from 'ngx-progressbar';
import { DomSanitizer } from '@angular/platform-browser'


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  contacts: any[] = [];
  contacts_total_rows: number;
  replication_info: string;
  
  remote_update_seq: number;
  local_update_seq: number;

  syncHandler: any;
  toastSubscription: any;

  type: ContactType = new ContactType();
  typeShort: string;

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
    //this.getAllContacts();
    this.startLiveSync();    
  }

  ionViewDidLeave() {
    //this.getAllContacts();
    this.stopLiveSync();    
  }


  getAllContacts() {
    this.ngProgress.start();
    this.contactProvider.getAllContacts(this.type.getType()).then(

      result => {
        this.contacts = [];
        result.docs.forEach( item => {
          //console.log("item", item.doc)
          this.contacts.push(item);
        });
        //console.log("this.contacts", this.contacts)
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


  startLiveSync () {
    var self = this;

    this.contactProvider.dbRemote.info().then(
      (info:any) => {
        console.log("Remote info:", info);
        this.remote_update_seq = Number.parseInt(info.update_seq);        
      }
    )

    this.syncHandler = this.contactProvider.dbLocal.sync(this.contactProvider.dbRemote, {
      live: true,
      retry: true,
      timeout: 60000
    }).on('change', function (change) {
      console.log ("LiveSync change: ", change);
      self.local_update_seq = change.change.last_seq;
      self.replication_info = String(Math.round( 100 * self.local_update_seq / self.remote_update_seq));
      //self.replication_info = change.change.ok + ':' + change.change.docs_read + ':' + change.change.docs_written + ':' + change.change.last_seq
      self.getTotalRows();

      // change.change.docs.some(
      //   item => {
      //     if (item._id) {
      //         var contact = item as any;
      //         //console.log('New contact: ', contact.name);
      //         // self.toastsManager.info(contact.name,'Received new contact',  { dismiss: 'click', showCloseButton: true }).then(
      //         //   toast => {
      //         //     //self.toastMessageProvider.toastr.dismissToast(toast);
      //         //   }
      //         // )


      //         return true; // break
      //     }
      //   })
      // 
      self.getAllContacts();
      // yo, something changed!
    }).on('paused', function (info) {
      // replication was paused, usually because of a lost connection
    }).on('error', function (err) {
      // totally unhandled error (shouldn't happen)
    });


    this.toastSubscription = this.toastsManager.onClickToast().subscribe(
      toast => {
        console.log("onClick: ", toast);
        this.toastsManager.dismissToast(toast);
      }
    )
  }

  stopLiveSync() {
    this.syncHandler.cancel();
    this.toastSubscription.unsubscribe();
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