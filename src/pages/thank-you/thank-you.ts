import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ThankYouPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-thank-you',
  templateUrl: 'thank-you.html',
})
export class ThankYouPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // setTimeout(() => {
      // this.app.getRootNav().getActiveChildNav().select(0);
    // }, 5000);
  }

}
