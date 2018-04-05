import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { HTTP } from '@ionic-native/http';

import { CodeVerificationPage } from '../code-verification/code-verification'

/**
 * Generated class for the PhoneVerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var countryData;

@Component({
  selector: 'page-phone-verification',
  templateUrl: 'phone-verification.html',
})
export class PhoneVerificationPage {
  country: any;
  countries: any;
  form: FormGroup;
  code: any;
  msg: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: HTTP) {
    this.countries = countryData;
    this.country = this.countries[161];
    this.form= this.formBuilder.group({
      'number':['',Validators.compose([Validators.required,Validators.pattern('^[0-9]{9,12}$')])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneVerificationPage');
  }
  onSubmit(){
    if(this.form.valid){
      let to = '+' + this.country.dialCode + this.form.value.number;
      this.http.setDataSerializer('json');
      this.http.post("http://www.qjskills.com/May29Services/May29_SMS/TwilioSMS.php", { requestType: "send code", "number": to }, {})
      .then(data => {
        let responseData = JSON.parse(data.data);
        if(!responseData.error){
          this.navCtrl.push(CodeVerificationPage, { code: responseData.code, number: to, request: this.navParams.get("request") });
        }else{
          this.msg="something went wrong";
        }
      })
      .catch(error => {
        this.code='error';
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
    }
  }
}
