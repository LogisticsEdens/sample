import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup} from '@angular/forms';

import { LocationPage } from './../location/location';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {//[a-zA-Z]{3,12}
  form: FormGroup;//
  maxDate: any;
  minDate: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {

    let today = new Date();
    this.form= this.formBuilder.group({
      'name':['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z]{3,12}(\\s[a-zA-Z]{2,12}){0,3}$')])],
      'gender':['',Validators.required],
      'dateOfBirth':[today.getFullYear() - 20 +'-06-06',Validators.required]
    });
    this.maxDate = today.getFullYear() - 6 + "-12-31";
    this.minDate = today.getFullYear() - 80;
  }
  ionViewDidLoad() {
  }
  onSubmit(){
    if(this.form.valid){
      this.navCtrl.push(LocationPage , { userInfo: this.form.value });
    }
  }
}
