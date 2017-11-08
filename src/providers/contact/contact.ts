import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ToastMessageProvider } from '../toastMessage/toastMessage'
//import PouchDB from 'pouchdb';
import PouchDB from "pouchdb";
import find from 'pouchdb-find';
import { NgProgress } from 'ngx-progressbar';


/*
  Generated class for the ContactProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactProvider {

  dbLocal: PouchDB.Database;
  dbRemote: PouchDB.Database;

  dbOptions: any = {
    limit: 5,
    include_docs: true,
  };

  constructor(
    public http: Http,
    public toastMessageProvider: ToastMessageProvider,
    public ngProgress: NgProgress

  ) {
    console.log('Hello ContactProvider Provider');

    // init 
    PouchDB.plugin(find);
    this.initPouchDB();
  }

  initPouchDB() {

    this.ngProgress.start();

    this.dbLocal = new PouchDB('contacts');
    console.log("dbLocal", this.dbLocal);

    this.dbRemote = new PouchDB('https://contact:contact@jrg.deneb.uberspace.de/couchdb/contacts');
    console.log("dbRemote", this.dbRemote);

    this.ngProgress.done();

    this.sync();
  }

  // getAllContactsStatic() {
  //   return this.http.get('/assets/data/contact-600.json')
  // }

  getAllContacts(type:string) {


    // return this.dbLocal.allDocs({
    //   include_docs: true,
    //   attachments: true
    // });

    return this.dbLocal.find({
      selector: { type: type },
      limit: 20
    })
  }

  
  getContactPager () {

    return new Promise( (resolve, reject ) => {

      this.dbLocal.allDocs(this.dbOptions).then(
        response => {
          if (response && response.rows.length > 0) {
            this.dbOptions.startkey = response.rows[response.rows.length - 1].id;
            this.dbOptions.skip = 1;
            console.log("response", response)
            resolve(response)
          }
        },
        error => {
          console.log("error", error)
          reject(error);
        }
      ) 
  
    })

      
  
    
  }


  sync() {
    this.ngProgress.start();

    return this.dbLocal.sync(this.dbRemote).then(
      ok => {
        console.log("sync", ok)
        this.ngProgress.done();
      },
      er => {
        console.log("error", er)
        //this.toastMessageProvider.toastr.error(JSON.stringify(er), 'Sync Error')
        this.ngProgress.done();
      }
    );
  }


  createIndexAllContacts() {

    this.dbLocal.createIndex({
      index: { fields: ['type'] }
    }).then(
      ok => {
      },
      error => {
      });
  }


  save(contact) {
    this.toastMessageProvider.show("Save Contact");
    return this.dbLocal.put(contact)
  }

  remove(contact) {
    this.toastMessageProvider.show("Delete Contact");
    return this.dbLocal.remove(contact)
  }

  destroy() {
    return this.dbLocal.destroy()
  }

  randomizePicture() {
    this.ngProgress.start();
    this.getAllContacts('contact-generated').then(

      result => {

        this.ngProgress.done();

        result.docs.forEach(item => {
          var contact = item as any;

          contact.picture = new Contact().randomPictureUrl();

          this.save(contact);

          console.log("item: ", item);
        })

        //this.startLiveSync();
      },

      error => {
        console.log("error", error)
        this.ngProgress.done();
      }
    )
  }




  createRandomUser() {
    this.http.get('https://randomuser.me/api/').subscribe(
      result => {
        console.log("result", result);
        var newContact = new Contact();
        var randomUser = result.json().results[0];
        console.log("randomUser", randomUser)
        newContact.name = randomUser.name.last;
        newContact.address = randomUser.location.street;
        newContact.phone = randomUser.phone;
        newContact.type = 'contact-generated';

        this.save(newContact);
      }
    )
  }


  createRandomUsers(count) {

    this.ngProgress.start();

    let counter = 0;

    let interval = setInterval(() => {
      this.createRandomUser();
      counter++;
      if (counter >= count) {
        clearInterval(interval);
        this.ngProgress.done();
      }
    }, 100)

  }


  deleteRandomUsers(count) {
    var counter = 0;
    this.ngProgress.start();
    this.getAllContacts('contact-generated').then(

      result => {

        this.ngProgress.done();

        result.docs.forEach(item => {
          var contact = item as any;

          counter++
          if (counter < count) {
            this.remove(contact);
          }

          console.log("Delete: ", item);
        })

      },

      error => {
        console.log("error", error)
        this.ngProgress.done();
      }
    )
  }


}



export class Contact {

  "_id" = new Date().toISOString();
  "type" = "contact-example"
  "index" = 0
  "guid" = ""
  "isActive" = true
  "balance" = "0"
  "picture" = this.randomPictureUrl()
  "age" = 0
  "eyeColor" = ""
  "name" = ""
  "gender" = ""
  "company" = ""
  "email" = ""
  "phone" = ""
  "address" = ""
  "about" = ""
  "registered" = ""
  "latitude" = 50.327357 - Math.random()
  "longitude" = 13.131642 - Math.random()
  "tags" = []
  "friends" = []
  "greeting" = ""
  "favoriteFruit" = ""

  randomPictureUrl() {
    return "https://randomuser.me/api/portraits/" + (Math.random() >= 0.5 ? 'men' : 'women') + "/" + Math.floor(Math.random() * (100)) + ".jpg"
  }

}

export class ContactMeta {
  type:string[] = ['contact-examples', 'contact-generated']
}