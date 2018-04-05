import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';

import { SearchMainCategoryPage } from '../main-category/main-category';
import { SearchSubCategoryPage } from '../sub-category/sub-category';
import { FindServicesPage } from '../find-services/find-services';
import { PhoneVerificationPage } from '../phone-verification/phone-verification';
import { RegisterPage } from '../register/register';

//import { NativeStorage } from '@ionic-native/native-storage';
import { HTTP } from '@ionic-native/http';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import {LocalStorageProvider} from '../../providers/local-storage/local-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  msg: any;//
  times: any;//
  data: any;//
  searchValue: any;
  searchItems: any;
  distinctItems: any;
  Items: any;
  fields: any;
  hide: boolean;
  constructor(public navCtrl: NavController, private http: HTTP, private push: Push, platform: Platform, private alertCtrl: AlertController, public localStorage: LocalStorageProvider) {
    platform.ready().then(() => {
      this.pushSetup();
    });
    this.searchValue = '';
    this.searchItems = [];
    this.distinctItems = [];
    this.hide = true;
    try {
      this.http.setDataSerializer('json');
      this.http.post("http://www.qjskills.com/May29Services/Select.php", {requestType: "get all categories"}, {})
      .then(data => {
        let responseData = JSON.parse(data.data);
        if(!responseData.error){
          //this.data = JSON.stringify(responseData);
          this.Items = responseData.categories;
          this.fields = responseData.fields;
          for(let i = 0; i < this.Items.length; i++){
            if(this.distinctItems.indexOf(this.Items[i].field) == -1){
              this.distinctItems.push(this.Items[i].field)
            }
            if(this.distinctItems.indexOf(this.Items[i].main) == -1){
              this.distinctItems.push(this.Items[i].main)
            }
            if(this.distinctItems.indexOf(this.Items[i].sub) == -1){
              this.distinctItems.push(this.Items[i].sub)
            }
          }
          this.data = this.distinctItems;
        }
      })
      .catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
    } catch (error) {

    }
  }

  onBtnClick(){
    // if(this.localStorage.isSet('number')){
      // this.navCtrl.push(RegisterPage);
    // }else{
      // this.navCtrl.push(PhoneVerificationPage, {request: "add services page"});
    // }
    this.localStorage.setProperty('isServiceProvider', true);
  }
  showSearchedItems(){
    this.hide = false;
  }
  hideSearchedItems(){
    this.hide = true;
  }
  onClickFn(id){
    this.navCtrl.push(SearchMainCategoryPage, { parentID: id });
  }
  openPage(){
    this.navCtrl.push(FindServicesPage);
  }
  updateSearchResults(){
    if(this.searchValue == ''){
      this.searchItems = [];
    }else{
      let len = this.searchValue.length;
      this.searchItems = [];
      for(let i = 0; i < this.distinctItems.length; i++){
        let item = this.distinctItems[i];
        if(item.substring(0, len).toLowerCase() == this.searchValue.toLowerCase()){
          this.searchItems.push(item + this.findAncestors(item));
        }
      }
    }
  }
  selectSearchResult(val){
    let item = val.split(",")[0];//all indexes has space in start except first index 
    for(let i = 0; i < this.Items.length; i++){
      if(this.Items[i].field == item){
        this.navCtrl.push(SearchMainCategoryPage, { parentID: this.Items[i].f_id });
        break;
      }else if(this.Items[i].main == item){
        this.navCtrl.push(SearchSubCategoryPage, { parentID: this.Items[i].m_id });
        break;
      }else if(this.Items[i].sub == item){
        this.navCtrl.push(FindServicesPage, { parentID: this.Items[i].s_id });
        break;
      }
    }
    this.hideSearchedItems();
  }
  findAncestors(item):string{
    for(let i = 0; i < this.Items.length; i++){
      if(this.Items[i].field == item){
        return "";
      }else if(this.Items[i].main == item){
        return ", " + this.Items[i].field;
      }else if(this.Items[i].sub == item){
        return ", " + this.Items[i].main + ", " + this.Items[i].field;
      }
    }
  }
  pushSetup(){
    this.push.hasPermission()
    .then((res: any) => {
  
      if (res.isEnabled) {
        console.log('We have permission to send push notifications');
      } else {
        console.log('We do not have permission to send push notifications');
      }
  
    });
    this.push.createChannel({
      id: "testchannel1",
      description: "My first test channel",
      // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
      importance: 3
     }).then(() => console.log('Channel created'));
     
     // Delete a channel (Android O and above)
     this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));
     
     // Return a list of currently configured channels
     this.push.listChannels().then((channels) => console.log('List of channels', channels))
     
     // to initialize push notifications
     
     const options: PushOptions = {
        android: {
          senderID: "621640802323"
        },
        ios: {
            alert: 'true',
            badge: true,
            sound: 'false'
        },
        windows: {},
        browser: {
            pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        }
     };
     
     const pushObject: PushObject = this.push.init(options);
     
     
     pushObject.on('notification').subscribe((notification: any) => {
      let alert = this.alertCtrl.create({
        title: 'Title',
        message: JSON.stringify(notification),
        buttons: ['Dismiss']
      });
      alert.present();
     });
     
     pushObject.on('registration').subscribe((registration: any) => {
      let body = {
        requestType: "register anonymous fcm id",
        id: registration.registrationId
      };
      this.http.setDataSerializer('json');
      this.http.post("http://www.qjskills.com/May29Services/MobileInsert.php", body, {}).then(data=>{

      }).catch(error => {

      });
     });
     
     pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
}
