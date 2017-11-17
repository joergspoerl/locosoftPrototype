import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { List } from 'ionic-angular';

import { ContactProvider, Contact } from '../../providers/contact/contact';
import { ContactGeneratorProvider } from '../../providers/contact-generator/contact-generator';
import { ContactDetailsPage } from '../contact-details/contact-details'
import { GoogleMapsPage } from '../google-maps/google-maps'

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { SearchPipe } from '../../pipe/searchPipe'
import { SlicePipe } from '@angular/common';


/**
 * Generated class for the Contact2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact3',
  templateUrl: 'contact3.html',
})
export class Contact3Page {
  @ViewChild(List) list: List;
  
  searchTerm: string;
  searchTerms = new Subject<string>();
  contact$ : Observable<Contact>;
  contacts : Contact[];
  allContacts : Contact[];

  page: number = 10;


  contactsLimit: number = 10;
  searchCount: number;
  allContactsLength: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private searchPipe: SearchPipe,
    private slicePipe: SlicePipe,
    public contactProvider: ContactProvider,
    
) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Contact3Page');
    this.initSearchBox();
  }

  initSearchBox() {
    this.contactProvider.getAllContacts('contact-generated').then(
      result => {
        console.log("result: ", result)
        this.allContacts = result.docs as Contact[];
        this.allContactsLength = this.allContacts.length;

        console.log("allContacts: ",  this.allContacts)

        this.contactsLimit = this.page;            
        this.load(this.searchTerm);

        this.searchTerms
        .debounceTime(100)
        .distinctUntilChanged()
        .subscribe(
          searchTerm => {
            console.log("searchTerm: ", searchTerm);
            this.searchTerm = searchTerm;
            this.contactsLimit = this.page;            
            this.load(searchTerm);
          }
        )
    
      }
    )
  }

  load (searchTerm) {
    console.log("searchTerm", searchTerm)
    let afterSearchPipe = this.searchPipe.transform( this.allContacts,'name, adress', searchTerm);
    this.searchCount = afterSearchPipe.length
    this.contacts = this.slicePipe.transform(afterSearchPipe,0,this.contactsLimit);
    console.log("after Pipe: ", this.contacts);
  }


  doInfinite (event) {
    if (this.contactsLimit <= this.searchCount - this.page)
    this.contactsLimit = this.contactsLimit + this.page;
    console.log("contactLimit: ", this.contactsLimit);
    this.load(this.searchTerm);

    event.complete();
  }
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }


  showMap() {
    var markers = [];
    for (let entry of this.contacts) {
      markers.push({ 
        lat: Number.parseFloat(entry.latitude as any), 
        lng: Number.parseFloat(entry.longitude as any)})      
    }
    console.log("markers", markers)
    this.navCtrl.push(GoogleMapsPage, { 'latLngArray': markers });
  }


  add() {
    console.log("add")
    this.navCtrl.push(ContactDetailsPage, { 'contact' : new Contact() });
  }

  removeClick(removedContact:Contact) {
    console.log("removedContact", removedContact)
    let index = this.contacts.findIndex(
      (element) => {
        return element._id == removedContact._id}
    )
    console.log("index", index);
    this.contacts.splice(index,1);
    
  }
}
