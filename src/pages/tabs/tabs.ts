import { Component } from '@angular/core';
import { NavController, ActionSheetController, AlertController, App } from 'ionic-angular';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SuggestionPage } from '../suggestion/suggestion';
import { SettingPage } from '../setting/setting';
import { MyProfilePage } from '../my-profile/my-profile';
import { MyLowProfilePage } from '../my-low-profile/my-low-profile';

import { SocialSharing } from '@ionic-native/social-sharing';
import { HTTP } from '@ionic-native/http';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SuggestionPage;
  tab4Root = SettingPage;
  tab5Root = ContactPage;
  show: boolean = false;
  constructor(public navCtrl: NavController, private socialSharing: SocialSharing, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, private app: App, private http: HTTP, public localStorage: LocalStorageProvider) {
    if(localStorage.isSet('isServiceProvider')){
      this.show = true;
    }
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
  openProfile(){
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Select.php", { requestType: "get service type", number: this.localStorage.getProperty('number') }, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        if(responseData.type == "Platium" || responseData.type == "Gold"){
          this.navCtrl.push(MyProfilePage, { type: responseData.type });
        }else{
          this.navCtrl.push(MyLowProfilePage, { type: responseData.type});
        }
      }
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });
   }
}
