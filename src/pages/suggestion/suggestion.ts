import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ModalController, App } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { HTTP } from '@ionic-native/http';

import { ThankYouPage } from '../thank-you/thank-you';

/**
 * Generated class for the SuggestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-suggestion',
  templateUrl: 'suggestion.html',
})
export class SuggestionPage {
  form: FormGroup;
  ip: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: HTTP, public loadingCtrl: LoadingController, public modalCtrl: ModalController, private app: App) {
    this.form = this.formBuilder.group({
      'Name':['',Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]{3,12}(\\s[a-zA-Z]{2,12}){0,3}$')])],
      'Email':['',Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
      'Description':['',Validators.required]
    });
  }

  ionViewDidLoad() {
    this.http.setDataSerializer('json');
    this.http.post("http://www.ip-api.com/json", {}, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      this.ip = responseData.query;
    }).catch(error =>{
      this.ip = "";
    });
  }
  onSubmit(){
    if(this.form.valid){
      let spinner = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Sending...'
      });
      spinner.present();
      let body={
        name: this.form.value.Name,
        email: this.form.value.Email,
        description: this.form.value.Description,
        ipAddress: this.ip,
      };
      this.http.setDataSerializer('json');
      this.http.post("http://www.qjskills.com/May29Services/suggestion.php", body, {})
      .then(data => {
        let responseData = JSON.parse(data.data);
        if(!responseData.error){
          spinner.dismiss();
          let profileModal = this.modalCtrl.create(ThankYouPage);
          profileModal.present();
           setTimeout(() => {
             profileModal.dismiss();
             this.app.getRootNav().getActiveChildNav().select(0);
           }, 5000);
        }else{
          spinner.dismiss();
        }
      })
      .catch(error => {
        spinner.dismiss();
      });
    }
  }
}
