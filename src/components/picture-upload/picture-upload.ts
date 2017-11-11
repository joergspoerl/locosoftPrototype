import { Component, Input,  OnChanges, SimpleChange } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser'
import { ContactProvider, Contact } from '../../providers/contact/contact';

/**
 * Generated class for the PictureUploadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'picture-upload',
  templateUrl: 'picture-upload.html'
})
export class PictureUploadComponent {
  @Input() contactId: string;
  
  imageURI: any;
  cameraOptions: CameraOptions;
  blobImageUrl: any;

  text: string;

  constructor(
    public contactProvider: ContactProvider,
    private camera: Camera,
    private sanitizer: DomSanitizer,

  ) {
    console.log('Hello PictureUploadComponent Component');
    this.text = 'Hello World';
  }


  getImage() {
    this.cameraOptions = {
      quality: 100,
      //destinationType: this.camera.DestinationType.FILE_URI,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 500,
      targetHeight: 500
    }

    this.camera.getPicture(this.cameraOptions).then(
      (imageData) => {

        console.log("imageData", JSON.stringify(imageData));

        var blob = b64toBlob(imageData, 'image/png', 512);
        this.blobImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob))

        console.log("blobImageUrl", JSON.stringify(this.blobImageUrl));

      }, (err) => {
        console.log(err);
      });

  }






}


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

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}
