import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PersonalOnePage } from '../personal-one/personal-one';
import { PersonalTwoPage } from '../personal-two/personal-two';
import { ProfessionPage } from '../profession/profession';
import { BusinessDataOnePage } from '../business-data-one/business-data-one';
import { BusinessDataTwoPage } from '../business-data-two/business-data-two';
import { ContactDataPage} from '../contact-data/contact-data';
import { OtherDataPage } from '../other-data/other-data';
import { CategoryPage} from '../category/category';

/**
 * Generated class for the MyProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProfilePage');
  }
  openPersonOne(){
    this.navCtrl.push(PersonalOnePage, { type: this.navParams.get('type') });
  }
  openPersonTwo(){
    this.navCtrl.push(PersonalTwoPage, { type: this.navParams.get('type') });
  }
  openProfession(){
    this.navCtrl.push(ProfessionPage, { type: this.navParams.get('type') });
  }
  openBusinessDataOne(){
    this.navCtrl.push(BusinessDataOnePage), { type: this.navParams.get('type') };
  }
  openBusinessDataTwo(){
    this.navCtrl.push(BusinessDataTwoPage, { type: this.navParams.get('type') });
  }
  openContactData(){
    this.navCtrl.push(ContactDataPage, { type: this.navParams.get('type') });
  }
  openOtherData(){
    this.navCtrl.push(OtherDataPage, { type: this.navParams.get('type') });
  }
  openCategory(){
    this.navCtrl.push(CategoryPage, { type: this.navParams.get('type') });
  }
}
