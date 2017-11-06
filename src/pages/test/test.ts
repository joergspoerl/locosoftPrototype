import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastMessageProvider } from '../../providers/toastMessage/toastMessage'
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

import { NgProgress } from 'ngx-progressbar';

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
    public ngProgress: NgProgress
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

  testLoading() {
    this.loadingProvider.testLoading("Test")
  }

  hide() {
    this.loadingProvider.hide(null)
  }

  startProgress() {
    this.ngProgress.start();
  }

  doneProgress() {
    this.ngProgress.done();
  }


}
