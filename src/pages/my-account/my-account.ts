import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MyProfilePage } from '../my-profile/my-profile';
import { MyLowProfilePage } from '../my-low-profile/my-low-profile';

/**
 * Generated class for the MyAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAccountPage');
  }
  openMyProfile(){
    this.navCtrl.push(MyProfilePage);
  }
  openMyLowProfile(){
    this.navCtrl.push(MyLowProfilePage);
  }
}
