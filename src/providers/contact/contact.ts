import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ToastMessageProvider } from '../toastMessage/toastMessage'
//import PouchDB from 'pouchdb';
import PouchDB from "pouchdb";
import find from 'pouchdb-find';
import { NgProgress } from 'ngx-progressbar';
import { Observable } from 'rxjs/Observable';


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
    limit: 20,
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
    this.createIndex();
    //this.sync();
  }


  getAllContacts(type:string) {


    // return this.dbLocal.allDocs({
    //   include_docs: true,
    //   attachments: true
    // });

    return this.dbLocal.find({
      selector: { type: type },
      //limit: 20
    })
  }

  getTotalRows () {
    return this.dbLocal.allDocs({
      limit: 1
    });
  }
  
  getContactPager (type: string, reset?: boolean) {

    if (reset) {
      delete this.dbOptions.startkey;
      delete this.dbOptions.skip;
    }

    this.dbOptions.selector = {type: type}
    return new Promise( (resolve, reject ) => {

      this.dbLocal.find(this.dbOptions).then(
        response => {
          if (response && response.docs.length > 0) {
            this.dbOptions.startkey = response.docs[response.docs.length - 1]._id;
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

  createIndex () {
    this.dbLocal.createIndex ({
      index: {fields: ['type']}
    })
  }

  liveSync () {
    let self = this;
    let remote_update_seq: number;
    let local_update_seq: number;
    let replication_percent: number;
    let syncHandler: any;
  
    return new Observable (observer => {


      this.dbRemote.info().then(
        (info:any) => {
          console.log("Remote info:", info);
          remote_update_seq = Number.parseInt(info.update_seq);        
        }
      )
  
      syncHandler = this.dbLocal.sync(this.dbRemote, {
        live: true,
        retry: true,
        timeout: 60000
      }).on('change', function (change) {
        // yo, something changed!
        console.log ("LiveSync change: ", change);
        local_update_seq = change.change.last_seq;
        replication_percent = Math.round( 100 * local_update_seq / remote_update_seq);
        change['replication_percent'] = replication_percent;

        observer.next(change);

      }).on('paused', function (info) {
        // replication was paused, usually because of a lost connection
      }).on('error', function (err) {
        // totally unhandled error (shouldn't happen)
      });
  
      // unsubscribe function
      return () => { 
        syncHandler.cancel();
      }
    })


  }



  put(contact) {
    return this.dbLocal.put(contact)
  }

  remove(contact) {
    return this.dbLocal.remove(contact)
  }

  destroy() {
    return this.dbLocal.destroy()
  }

  putPicture(contact: Contact, picture) {
    let self = this;
    self.dbLocal.get(contact._id).then(
      result => {
        self.dbLocal.putAttachment(result._id, 'picture.png', result._rev, picture, 'text/plain', cb => console.log('putAttachment: ', cb))
      }
    )

  }


}



export class Contact {

  "_id" = new Date().toISOString();
  "_rev" = ""
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