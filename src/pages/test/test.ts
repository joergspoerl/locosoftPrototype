import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ToastMessageProvider } from '../../providers/toastMessage/toastMessage'
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

import { NgProgress } from 'ngx-progressbar';

import { ContactProvider, Contact } from '../../providers/contact/contact';


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

  contacts: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingProvider: ToastMessageProvider,
    public toastr: ToastsManager,
    public ngProgress: NgProgress,
    public contactProvider: ContactProvider,
    
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
//    this.loadingProvider.testLoading("Test")
  }

  hide() {
//    this.loadingProvider.hide(null)
  }

  startProgress() {
    this.ngProgress.start();
  }

  doneProgress() {
    this.ngProgress.done();
  }


  getAllContacts() {
    this.ngProgress.start();
    this.contactProvider.getAllContacts().then(

      result => {
        this.contacts = result.docs;
        console.log("this.contacts", this.contacts)
        this.ngProgress.done();

        result.docs.forEach( item => {
          var contact = item as Contact;
          var gender = Math.random() >= 0.5 ? 'men' : 'women';
          contact.picture = "https://randomuser.me/api/portraits/" + gender +"/" + Math.floor(Math.random() * (100)) + ".jpg"

          this.contactProvider.save(contact);

          console.log("item: ", item as Contact);
        })

        //this.startLiveSync();
      },

      error => {
        console.log("error", error)
        this.ngProgress.done();
      }
    )
  }


}
