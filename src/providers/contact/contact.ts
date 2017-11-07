import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ToastMessageProvider } from '../toastMessage/toastMessage'
//import PouchDB from 'pouchdb';
import PouchDB from "pouchdb";
import find    from 'pouchdb-find';
import { NgProgress } from 'ngx-progressbar';


/*
  Generated class for the ContactProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactProvider {

  dbLocal:  PouchDB.Database;
  dbRemote: PouchDB.Database;

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

  getAllContacts() {
    return this.dbLocal.find({
      selector: {
        type: 'contact-example'
      }
    })
  }

  // createExampleContactDB() {
  //   console.log("createExampleContactDB() start")

  //   this.loading.show("Create example ContactsDB");

  //   this.getAllContactsStatic().subscribe(

  //     result => {
  //       let dataSet = result.json();

  //       for (let contact of dataSet) {
  //         this.dbLocal.put(contact).then(
  //           result => {
  //             //console.log(result);
  //           },
  //           error => {
  //             //console.log(error);
  //           }
  //         )
  //       }
  //       this.loading.hide();
  //     },

  //     error => {
  //       console.log(error);
  //     })
  // }

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
      index: {fields: ['type']}
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
    return  this.dbLocal.destroy()    
  }

  


}



export class Contact {

      "_id" = new Date().toISOString();
      "type"= "contact-example"
      "index"= 0
      "guid"= ""
      "isActive"= true
      "balance"= "0"
      "picture"= "http://placehold.it/32x32"
      "age"= 0
      "eyeColor"= ""
      "name"= ""
      "gender"= ""
      "company"= ""
      "email"= ""
      "phone"= ""
      "address"= ""
      "about"= ""
      "registered"= ""
      "latitude"= 50.327357 -  Math.random() 
      "longitude"= 13.131642 -  Math.random()
      "tags"= []
      "friends"= []
      "greeting"= ""
      "favoriteFruit"= ""

}