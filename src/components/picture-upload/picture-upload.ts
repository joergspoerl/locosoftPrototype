import { Component } from '@angular/core';

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

  text: string;

  constructor() {
    console.log('Hello PictureUploadComponent Component');
    this.text = 'Hello World';
  }

}
