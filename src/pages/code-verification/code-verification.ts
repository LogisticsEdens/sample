import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RegisterPage } from '../register/register';

import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { HTTP } from '@ionic-native/http';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

/**
 * Generated class for the CodeVerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-code-verification',
  templateUrl: 'code-verification.html',
})
export class CodeVerificationPage {
  code:any;
  number:any;
  form: FormGroup;
  msg:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP, private formBuilder: FormBuilder, private localStorage: LocalStorageProvider) {
    this.code = this.navParams.get("code");
    this.number = this.navParams.get("number");
    this.form= this.formBuilder.group({
      'enteredCode':['',Validators.compose([Validators.required,Validators.pattern('^[0-9]{5}$')])]
    });
  }
  onVerification(){
    if(this.form.valid){
      if(this.code == this.form.value.enteredCode){
        this.http.setDataSerializer('json');
        this.http.post("http://www.qjskills.com/May29Services/Insert.php", { "requestType": "register number", "number": this.number }, {})
        .then(data => {
          this.msg = "Registered Successfully";
          this.localStorage.setProperty("number", this.number);
          if(this.navParams.get("request") == "add services page"){
            this.navCtrl.push(RegisterPage);
          }else{
            //something else
          }
        })
        .catch(error => {
          this.msg = "Something went wrong";
        });
      }else{
        this.msg = "Wrong Code";
      }
    }else{

    }
  }
}
