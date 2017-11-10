import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMapsPage } from '../google-maps/google-maps'
import { ContactProvider, Contact } from '../../providers/contact/contact';

/**
 * Generated class for the ContactDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-contact-details',
  templateUrl: 'contact-details.html',
})
export class ContactDetailsPage {
  @ViewChild('pictureFileUploadInput') pictureFileUploadInputRef: ElementRef;
  @ViewChild('picture') pictureRef: ElementRef;
  
  contact: any;
  newAttachment: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public contactProvider: ContactProvider,
  ) {
    this.contact = navParams.get('contact');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactDetailsPage');
    this.initFileUpload();
  }

  initFileUpload() {
    
    var self = this;
    var input = this.pictureFileUploadInputRef.nativeElement;
    var picture = this.pictureRef.nativeElement;

    input.addEventListener('change', function () {
      self.newAttachment = input.files[0]; // file is a Blob
      console.log("this.newAttachment", self.newAttachment)
      
      // preview
      picture.src =  URL.createObjectURL(self.newAttachment);
      console.log("self.newAttachment", self.newAttachment)
      
    });
  }
    

  save(contact: Contact) {
    console.log("save: ", contact);
    if (contact.name && contact.name != '') {

      // remove temp fields
      delete (contact as any).pictureAttachment;
      delete (contact as any).pictureDATA;
      
      this.contactProvider.save(contact).then(
        ok => {
          this.savePicture(contact);
          this.navCtrl.pop()
        },
        error => { }
      );
    }
  }


  savePicture(contact: Contact) {
    console.log("this.newAttachment", this.newAttachment)
    console.log("savePicture()")
    let self = this;
    console.log("self.newAttachment", self.newAttachment)
    self.contactProvider.dbLocal.get(contact._id).then(
      result => {

        console.log("self.newAttachment", self.newAttachment)
        self.contactProvider.dbLocal.putAttachment(result._id, 'picture.png', result._rev, self.newAttachment, 'text/plain', cb => console.log('putAttachment: ', cb))
      }
    )

  }

  showMap(contact: Contact) {
    this.navCtrl.push(GoogleMapsPage, { 'latLngArray': [{ lat: contact.latitude, lng: contact.longitude }] });
  }


}
