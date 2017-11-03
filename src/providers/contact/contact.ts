import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingProvider } from '../loading/loading'
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ContactProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactProvider {


  constructor(
    public http: Http,
    public loading: LoadingProvider,
    ) {
    console.log('Hello ContactProvider Provider');

  }


  getAllContactsStatic() {
    return this.http.get('assets/data/contact-600.json')
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