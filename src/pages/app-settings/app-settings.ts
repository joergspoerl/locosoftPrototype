import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the AppSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-app-settings',
  templateUrl: 'app-settings.html',
})
export class AppSettingsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AppSettingsPage');
  }

  screenTimout(): void {
    let prompt = this.alertCtrl.create({
      // title: 'something',
      message: 'Select option ',
      inputs: [
        {
          type: 'radio',
          label: '15 Sekunden',
          value: '15'
        },
        {
          type: 'radio',
          label: '30 Sekunden',
          value: '30',
          checked: true
        }, {
          type: 'radio',
          label: '1 Minute',
          value: '60'
        },
        {
          type: 'radio',
          label: '2 Minuten',
          value: '120'
        },
        {
          type: 'radio',
          label: '5 Minuten',
          value: '300'
        },
        {
          type: 'radio',
          label: '10 Minuten',
          value: '600'
        },],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("cancel clicked");
          }
        },
        {
          text: "Ok",
          handler: data => {
            console.log("search clicked", data);
          }
        }]
    });
    prompt.present();
  }

  unlockMethode(): void {
    let prompt = this.alertCtrl.create({
      // title: 'something',
      message: 'Select option ',
      inputs: [
        {
          type: 'radio',
          label: 'Loco-Soft Password',
          value: 'locosoftPassword'
        },
        {
          type: 'radio',
          label: 'Google Authentication',
          value: 'googleAuth'
        },
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("cancel clicked");
          }
        },
        {
          text: "Ok",
          handler: data => {
            console.log("search clicked", data);
          }
        }]
    });
    prompt.present();
  }

}
