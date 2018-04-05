import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

/**
 * Generated class for the OtherDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-other-data',
  templateUrl: 'other-data.html',
})
export class OtherDataPage {
  public imageSrc1: string = "assets/imgs/empty.jpg";
  public imageSrc2: string = "assets/imgs/empty.jpg";
  public imageSrc3: string = "assets/imgs/empty.jpg";
  public imageSrc4: string = "assets/imgs/empty.jpg";
  public imageSrc5: string = "assets/imgs/empty.jpg";
  public imageSrcs: any;
  public Rewards;
  public FreeDaysActivation;
  public Reviews;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HTTP, private camera: Camera, private transfer: FileTransfer, public loadingCtrl: LoadingController) {
    let hide = false;
    if(this.navParams.get('type') == "Gold"){
      hide = true;
    }
    this.imageSrcs = [{
      src:"assets/imgs/empty.jpg",
      isChange: false,
      hide: false
    },
    {
      src:"assets/imgs/empty.jpg",
      isChange: false,
      hide: false
    },
    {
      src:"assets/imgs/empty.jpg",
      isChange: false,
      hide: hide
    },
    {
      src:"assets/imgs/empty.jpg",
      isChange: false,
      hide: hide
    },
    {
      src:"assets/imgs/empty.jpg",
      isChange: false,
      hide: hide
    }];
  }

  ionViewDidLoad() {
    this.http.setDataSerializer('json');
    this.http.post("http://www.qjskills.com/May29Services/Select.php", { requestType: "get other data", userNumber: 'help to select userID' }, {})
    .then(data => {
      let responseData = JSON.parse(data.data);
      if(!responseData.error){
        this.setImage(0, responseData.info[0].ImageUrl1);
        this.setImage(1, responseData.info[0].ImageUrl2);
        this.setImage(2, responseData.info[0].ImageUrl3);
        this.setImage(3, responseData.info[0].ImageUrl4);
        this.setImage(4, responseData.info[0].ImageUrl5);
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
    this.uploadImages(0, spinner);
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
          colName: 'ImageUrl' + (index + 1),
          tableName: 'ServiceImages',
          targetPath: 'Images/',
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
