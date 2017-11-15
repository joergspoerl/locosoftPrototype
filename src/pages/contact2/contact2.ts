import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ContactProvider, Contact } from '../../providers/contact/contact';
import { ContactGeneratorProvider } from '../../providers/contact-generator/contact-generator';

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
  selector: 'page-contact2',
  templateUrl: 'contact2.html',
})
export class Contact2Page {

  searchBoxModel: string;
  searchTerms = new Subject<string>();
  contact$ : Observable<Contact>;
  contacts : Contact[];
  allContacts : Contact[];


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
    console.log('ionViewDidLoad Contact2Page');
    this.initSearchBox();
  }

  initSearchBox() {
    this.contactProvider.getAllContacts('contact-generated').then(
      result => {
        console.log("result: ", result)
        this.allContacts = result.docs as Contact[];
        this.allContactsLength = this.allContacts.length;

        console.log("allContacts: ",  this.allContacts)

        this.contactsLimit = 10;            
        this.load(this.searchBoxModel);

        this.searchTerms
        .debounceTime(100)
        .distinctUntilChanged()
        .subscribe(
          searchTerm => {
            console.log("searchTerm: ", searchTerm);
            this.contactsLimit = 10;            
            this.load(searchTerm);
          }
        )
    
      }
    )
  }

  load (searchTerm) {
    let afterSearchPipe = this.searchPipe.transform( this.allContacts,'name, adress', searchTerm);
    this.searchCount = afterSearchPipe.length
    this.contacts = this.slicePipe.transform(afterSearchPipe,0,this.contactsLimit);
    console.log("after Pipe: ", this.contacts);
  }


  doInfinite (event) {
    this.contactsLimit = this.contactsLimit + 10;
    console.log("contactLimit: ", this.contactsLimit);
    this.load (this.searchBoxModel);

    event.complete();
  }
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

}
