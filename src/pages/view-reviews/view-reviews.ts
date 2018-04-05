import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { HTTP } from '@ionic-native/http';

/**
 * Generated class for the ViewReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-reviews',
  templateUrl: 'view-reviews.html',
})
export class ViewReviewsPage {
  form: FormGroup;
  name: string = "Company Name";
  userRating: number = 0;
  ratingLabel: string = "0";
  ratingStars: RatingStars[] = [
    new RatingStars(0.3 , 0.7, false),
    new RatingStars(0.8 , 1.2, false),
    new RatingStars(1.3 , 1.7, false),
    new RatingStars(1.8 , 2.2, false),
    new RatingStars(2.3 , 2.7, false),
    new RatingStars(2.8 , 3.2, false),
    new RatingStars(3.3 , 3.7, false),
    new RatingStars(3.8 , 4.2, false),
    new RatingStars(4.3 , 4.7, false),
    new RatingStars(4.8 , 5.0, false),
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: HTTP, public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.form = this.formBuilder.group({
      'Description':['',Validators.required]
    });
  }

  ionViewDidLoad() {
    let body = {
      requestType: "get rating",
      id: this.navParams.get('id')
    };
    let spinner = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Sending...'
    });
    spinner.present();
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Select.php", body, {}).then(data=>{
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        let row = responseData.row;
        this.ratingLabel = row.Avg+"";
        if(this.ratingLabel.length > 3){
          this.ratingLabel = this.ratingLabel.slice(0, 3);
        }
        this.selectRatingStars(Number(this.ratingLabel));
        spinner.dismiss();
      }else{
        spinner.dismiss();
      }
    }).catch(error => {
      spinner.dismiss();
    });
  }
  rateUs(rate: number){
    this.userRating = rate;
  }
  submitRating(){
    if(this.userRating > 0){
      let alert = this.alertCtrl.create({
        title: 'Confirm Rating',
        message: 'Some Message',
        buttons: [
          {
            text: 'Agree',
            handler: () => {
              let body = {
                requestType: "insert rating",
                rating: this.userRating,
                serviceId: this.navParams.get('id')
              };
              this.httpRequest(body);
            }
          },
          {
            text: 'Disagree',
            role: 'cancel'
          }
        ]
      });
      alert.present();
    }
  }
  onSubmit(){
    if(this.form.valid){
      let body = {
        requestType: "insert comment",
        comment: this.form.value.Description,
        serviceId: this.navParams.get('id')
      };
      this.httpRequest(body);
    }
  }
  httpRequest(body): boolean{
    let result = false;
    let spinner = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Sending...'
    });
    spinner.present();
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/MobileInsert.php", body, {}).then(data=>{
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        spinner.dismiss();
        result = true;
      }else{
        spinner.dismiss();
      }
    }).catch(error => {
      spinner.dismiss();
    });
    return result;
  }
  selectRatingStars(num: number){
    for(let i = 0; i < this.ratingStars.length; i++){
      if(num >= this.ratingStars[i].min && num <= this.ratingStars[i].max){
        this.ratingStars[i].val = true;
        i = this.ratingStars.length;
      }
    }
  }
}
class RatingStars{
  constructor(public min: number ,public max: number, public val: boolean){
  }
}
