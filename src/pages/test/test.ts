import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastMessageProvider } from '../../providers/toastMessage/toastMessage'
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingProvider: ToastMessageProvider,
    public toastr: ToastsManager,
) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }

  showSuccess() {
    this.toastr.success('You are awesome!', 'Success!');
  }

  showError() {
    this.toastr.error('This is not good!', 'Oops!');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }
  
  showCustom() {
    console.log("showCustom")
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
  }

  showControlled() {
    
    this.loadingProvider.show("Test")
}

}
