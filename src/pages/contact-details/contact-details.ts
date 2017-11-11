import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { GoogleMapsPage } from '../google-maps/google-maps'
import { ContactProvider, Contact } from '../../providers/contact/contact';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser'

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
  
  isCordova: boolean = false;
  contact: any;
  imgUrl: any;
  newAttachment: any;
  cameraOptions: CameraOptions;
  
  constructor(
    public plattform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public contactProvider: ContactProvider,
    private transfer: FileTransfer,
    private camera: Camera,
    private sanitizer: DomSanitizer,
  ) {
    this.contact = navParams.get('contact');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactDetailsPage');

    this.isCordova = this.plattform.is('cordova');
    console.log("isCordova: ", this.isCordova)

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
    

  put(contact: Contact) {
    let self = this;
    console.log("save: ", contact);
    if (contact.name && contact.name != '') {

      // remove temp fields
      delete (contact as any).pictureAttachment;
      delete (contact as any).pictureDATA;
      
      this.contactProvider.put(contact).then(
        ok => {
          this.contactProvider.putPicture(contact, self.newAttachment);
          this.navCtrl.pop()
        },
        error => { }
      );
    }
  }



  showMap(contact: Contact) {
    this.navCtrl.push(GoogleMapsPage, { 'latLngArray': [{ lat: contact.latitude, lng: contact.longitude }] });
  }




  getCordovaImage() {
    var picture = this.pictureRef.nativeElement;
    
    this.cameraOptions  = {
      quality: 100,
      //destinationType: this.camera.DestinationType.FILE_URI,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 500,
      targetHeight: 500
    }
  
    this.camera.getPicture(this.cameraOptions).then((imageData) => {

      this.newAttachment = b64toBlob(imageData, 'image/png', 512);
//      picture.src = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.newAttachment))
      picture.src = URL.createObjectURL(this.newAttachment)
      
      console.log("picture.src", picture.src);
            
    }, (err) => {
      console.log(err);
    });

    // from https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
    function b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;
    
      var byteCharacters = atob(b64Data);
      var byteArrays = [];
    
      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
    
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
    
        var byteArray = new Uint8Array(byteNumbers);
    
        byteArrays.push(byteArray);
      }
    
      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }
  }
}
