import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ContactProvider, Contact } from '../../providers/contact/contact';
import { NgProgress } from 'ngx-progressbar';

/*
  Generated class for the ContactGeneratorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactGeneratorProvider {

  constructor(
    public http: Http,
    public contactProvider: ContactProvider,
    public ngProgress: NgProgress
    
  ) {
    console.log('Hello ContactGeneratorProvider Provider');
  }

  randomizePicture() {
    this.ngProgress.start();
    this.contactProvider.getAllContacts('contact-generated').then(

      result => {

        this.ngProgress.done();

        result.docs.forEach(item => {
          var contact = item as any;

          contact.picture = new Contact().randomPictureUrl();

          this.contactProvider.put(contact);

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

        this.contactProvider.put(newContact);
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
    console.log("count: ", count)
    var counter = 0;
    this.ngProgress.start();
    this.contactProvider.getAllContacts('contact-generated').then(

      result => {

        this.ngProgress.done();

        result.docs.forEach(item => {
          var contact = item as any;

          counter++
          if (counter < count) {
            this.contactProvider.remove(contact);
            console.log("Delete: ", item);
          }

        })


      },

      error => {
        console.log("error", error)
        this.ngProgress.done();
      }
    )
  }


}
