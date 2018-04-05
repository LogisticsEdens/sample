import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, App } from 'ionic-angular';

import { TermsAndConditionsPage } from '../terms-and-conditions/terms-and-conditions';
import { MyProfilePage } from '../my-profile/my-profile';
import { MyLowProfilePage } from '../my-low-profile/my-low-profile';
import { AboutPage } from '../about/about';
import { HelpPage } from '../help/help';

import { HTTP } from '@ionic-native/http';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { SocialSharing } from '@ionic-native/social-sharing';


/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  collection: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP, private localStorage: LocalStorageProvider, private socialSharing: SocialSharing, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, private app: App) {
    this.collection = [{
      label: 'My Account', page: 'openProfile', img: 'assets/imgs/setting/myaccount.png'
    },{
      label: 'About', page: AboutPage, img: 'assets/imgs/setting/about.png'
    },{
      label: 'Learn More', page: null, img: 'assets/imgs/setting/learnmore.png'
    },{
      label: 'Terms And Conditions', page: TermsAndConditionsPage, img: 'assets/imgs/setting/termsandcondition.png'
    },{
      label: 'Invite Contacts', page: 'Invite', img: 'assets/imgs/setting/invitecontact.png'
    },{
      label: 'Reminder', page: null, img: 'assets/imgs/setting/remainder.png'
    },{
      label: 'Rewards', page: null, img: 'assets/imgs/setting/rewards.png'
    },{
      label: 'Search', page: null, img: 'assets/imgs/setting/search.png'
    },{
      label: 'Help', page: HelpPage, img: 'assets/imgs/setting/help.png'
    }];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }
  openPage(obj: any){
    if(obj != null){
      if(obj == 'openProfile'){
        this.openProfile();
      }else if(obj == 'Invite'){
        this.showActionSheet();
      }else{
        this.navCtrl.push(obj);
      }
    }
  }
  openProfile(){
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Select.php", { requestType: "get service type", number: this.localStorage.getProperty('number') }, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        if(responseData.type == "Platium" || responseData.type == "Gold"){
          this.navCtrl.push(MyProfilePage, { type: responseData.type });
        }else{
          this.navCtrl.push(MyLowProfilePage, { type: responseData.type });
        }
      }
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error);
      console.log(error.headers);
    });
  }
  showActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Invite',
      cssClass: "padding",
      buttons: [
        {
          text: 'Whatsapp',
          handler: () => {
            this.shareWhatsApp();
          }
        },
        {
          text: 'Twitter',
          handler: () => {
            this.shareTwitter();
          }
        },
        {
          text: 'Facebook',
          handler: () => {
            this.shareFacebook();
          }
        },
        {
          text: 'Messenger',
          handler: () => {
            this.shareMessenger();
          }
        },
        {
          text: 'Contacts',
          handler: () => {
            this.app.getRootNav().getActiveChildNav().select(5);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
 
    actionSheet.present();
  }
  shareWhatsApp(){
    this.socialSharing.shareViaWhatsApp("Sharing Via WhatsApp","","https://www.google.com.pk/").then(() => {
      // Sharing via WhatsApp is possible
    }).catch(() => {
        let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'WhatsApp not installed',
            buttons: ['OK']
          });
          alert.present();
    });
  }
  shareFacebook(){
    this.socialSharing.shareViaFacebook("Sharing Via Facebook","","https://www.google.com.pk/").then(() => {
      // Sharing via Facebook is possible
    }).catch(() => {
        let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Facebook not installed',
            buttons: ['OK']
          });
          alert.present();
    });
  }
  shareTwitter(){
    this.socialSharing.shareViaTwitter("Sharing Via Twitter","","https://www.google.com.pk/").then(() => {
      // Sharing via Twitter is possible
    }).catch(() => {
        let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Twitter not installed',
            buttons: ['OK']
          });
          alert.present();
    });
  }
  shareMessenger(){
    //may be not work in IOS app_name = com.facebook.orca
    //use this com.apple.social.facebook.orca
    this.socialSharing.shareVia("com.facebook.orca","Message Via Messenger", null, null,"https://www.google.com.pk/").then(() => {
      // Sharing via Facebook is possible
    }).catch(() => {
        let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: 'Facebook Messenger not installed',
            buttons: ['OK']
          });
          alert.present();
    });
  }
}
