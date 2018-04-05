import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup} from '@angular/forms';
import { HTTP } from '@ionic-native/http';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


/**
 * Generated class for the ProfessionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profession',
  templateUrl: 'profession.html',
})
export class ProfessionPage {
  public imageSrcs: any;
  form: FormGroup;
  hide: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private http: HTTP, private camera: Camera, private transfer: FileTransfer, public loadingCtrl: LoadingController) {
    this.form = this.formBuilder.group({
      'Qualifications':['',Validators.pattern('^[a-zA-Z]{3,20}$')],
      'Commendations':['',Validators.pattern('^[a-zA-Z]{3,20}$')],
      'Accreditaions':['',Validators.pattern('^[a-zA-Z]{3,20}$')],
      'Approvals':['',Validators.pattern('^[a-zA-Z]{3,20}$')],
      'References1':['',Validators.pattern('^[a-zA-Z]{3,20}$')],
      'References2':['',Validators.pattern('^[a-zA-Z]{3,20}$')],
      'References3':['',Validators.pattern('^[a-zA-Z]{3,20}$')]
    });
    if(this.navParams.get('type') == "Gold"){
      this.hide = true;
    }
    this.imageSrcs = [{
      src:"assets/imgs/empty.jpg",
      isChange: false,
      hide: false
    },
    {
      src:"assets/imgs/empty.jpg",
      isChange: false,
      hide: this.hide
    },
    {
      src:"assets/imgs/empty.jpg",
      isChange: false,
      hide: this.hide
    }];
  }

  ionViewDidLoad() {
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Select.php", { requestType: "get profession", userNumber: 'help to select userID' }, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        //form Values Will Set
        this.form.controls['Qualifications'].setValue(responseData.info[0].Qualifications);
        this.form.controls['Commendations'].setValue(responseData.info[0].Commendation);
        this.form.controls['Accreditaions'].setValue(responseData.info[0].Accreditation);
        this.form.controls['Approvals'].setValue(responseData.info[0].Approvals);
        this.form.controls['References1'].setValue(responseData.info[0].Reference1);
        this.form.controls['References2'].setValue(responseData.info[0].Reference2);
        this.form.controls['References3'].setValue(responseData.info[0].Reference3);
        this.setImage(0, responseData.info[0].CertificateUrl1);
        this.setImage(1, responseData.info[0].CertificateUrl2);
        this.setImage(2, responseData.info[0].CertificateUrl3);
      }
    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });
  }
  setImage(index, src){
    if(src != "" && src != null && src != undefined){
      this.imageSrcs[index].src = 'http://www.qjskills.com/May29Services/' + src;
    }
  }
  openGallery(index: number){
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,      
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,      
      correctOrientation: true
    }
  
    this.camera.getPicture(cameraOptions)
      .then(file_uri => {
        this.imageSrcs[index].src = file_uri;
        this.imageSrcs[index].isChange = true;
      }, 
      err => {
        console.log('error');
      });
  }
  onSubmit(){
    let spinner = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Uploading...'
    });
    spinner.present();
    let body={
      requestType: "update profession",
      userNumber: "help to select userID",
      Qualifications: this.form.value.Qualifications,
      Commendations: this.form.value.Commendations,
      Accreditaions: this.form.value.Accreditaions,
      Approvals: this.form.value.Approvals,
      References1: this.form.value.References1,
      References2: this.form.value.References2,
      References3: this.form.value.References3
    }
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Update.php", body, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        //data update Succuessfully
        this.uploadImages(0, spinner);
      }else{
        spinner.dismiss();
        //show error
      }
    })
    .catch(error => {
      spinner.dismiss();
      //show error
    });
  }
  uploadImages(index, spinner){
    if(index == this.imageSrcs.length){
      spinner.dismiss();
    }else if(this.imageSrcs[index].isChange == false){
      this.uploadImages(index + 1, spinner);
    }else{
      let filename = 'image.jpg';//use in server
      let options: FileUploadOptions = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : { 
          colName: 'CertificateUrl' + (index + 1),
          tableName: 'ServiceCertificate',
          targetPath: 'Certificate/',
          userNumber: 'User Number here'
        }
      }
      const fileTransfer: FileTransferObject = this.transfer.create();
      fileTransfer.upload(this.imageSrcs[index].src, 'http://www.qjskills.com/May29Services/Upload.php', options)
      .then( data => {
        let response = JSON.parse(data.response);
        if(!response.error){
          if(index + 1 == this.imageSrcs.length){
            spinner.dismiss();
          }else{
            this.uploadImages(index + 1, spinner);
          }
        }else{
          spinner.dismiss();
          //show error
        }

      }, err => {
        //Error while uploading file
        spinner.dismiss();
        //show error
      });
    }
  }
}
