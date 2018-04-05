import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';

/**
 * Generated class for the ViewProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html',
})
export class ViewProfilePage {
  profile: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP, private mobile: CallNumber, private emailComposer: EmailComposer) {
    this.profile = {
      id: "",
      uniqueId: "",
      number: "",
      logo: {
        value: "",
        hasValue: false
      },
      name: {
        value: "",
        hasValue: false
      },
      email: {
        value: "",
        hasValue: false
      },
      address: {
        value: "",
        hasValue: false
      },
      website: {
        value: "",
        hasValue: false
      },
      skype: {
        value: "",
        hasValue: false
      },
      facebook: {
        value: "",
        hasValue: false
      },
      pinterest: {
        value: "",
        hasValue: false
      },
      twitter: {
        value: "",
        hasValue: false
      },
      certificate1: {
        value: "",
        hasValue: false
      },
      certificate2: {
        value: "",
        hasValue: false
      },
      certificate3: {
        value: "",
        hasValue: false
      },
    };
  }
  ionViewDidLoad() {
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Select.php", {requestType: "get profile to view", id: this.navParams.get("id"), number: this.navParams.get("number")}, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        let profile = responseData.profile;
        this.profile.id = profile.id;
        this.profile.uniqueId = profile.unique_Id
        this.profile.number = profile.number;
        if(this.hasValue(profile.CompanyName)){
          this.setValue('name', profile.CompanyName);
        }else if(this.hasValue(profile.FirstName)){
          this.setValue('name', profile.FirstName);
        }
        if(this.hasValue(profile.CompanyLogoUrl)){
          this.setValue('logo', profile.CompanyLogoUrl);
        }
        if(this.hasValue(profile.Email)){
          this.setValue('email', profile.Email);
        }
        if(this.hasValue(profile.Address1)){
          this.setValue('address', profile.Address1);
        }else if(this.hasValue(profile.Address2)){
          this.setValue('address', profile.Address2);
        }
        if(this.hasValue(profile.WebsiteUrl)){
          this.setValue('website', profile.WebsiteUrl);
        }
        if(this.hasValue(profile.CertificateUrl1)){
          this.setValue('certificate1', profile.CertificateUrl1);
        }
        if(this.hasValue(profile.CertificateUrl2)){
          this.setValue('certificate2', profile.CertificateUrl2);
        }
        if(this.hasValue(profile.CertificateUrl3)){
          this.setValue('certificate3', profile.CertificateUrl3);
        }
        if(this.hasValue(profile.Skype)){
          this.setValue('skype', profile.Skype);
        }
        if(this.hasValue(profile.FacebookUrl)){
          this.setValue('facebook', profile.FacebookUrl);
        }
        if(this.hasValue(profile.TwitterUrl)){
          this.setValue('twitter', profile.TwitterUrl);
        }
        if(this.hasValue(profile.PinterestUrl)){
          this.setValue('pinterest', profile.PinterestUrl);
        }
      }
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });
  }
  hasValue(value: any): boolean{
    return value != "" && value != null && value != undefined;
  }
  setValue(key: string, value: any): void{
    this.profile[key].value = value;
    this.profile[key].hasValue = true;
  }
}
