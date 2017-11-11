import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, RequestOptionsArgs, ResponseContentType } from '@angular/http';

import { ToastMessageProvider } from '../../providers/toastMessage/toastMessage'
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

import { NgProgress } from 'ngx-progressbar';

import { ContactProvider, Contact } from '../../providers/contact/contact';
import { ContactGeneratorProvider } from '../../providers/contact-generator/contact-generator';

import { Observable } from 'rxjs'

import { LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser'

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  @ViewChild('TestFileInput') TestFileInputRef: ElementRef;
  @ViewChild('TestFileImg') TestFileImgRef: ElementRef;
  @ViewChild('ImportImg') ImportImgRef: ElementRef;
  @ViewChild('ImportCanvas') ImportCanvasRef: ElementRef;
  @ViewChild('OutputImage') OutputImageRef: ElementRef;
  
  count: number = 100;
  fileupload_doc = '2017-11-08T12:42:38.298Z';
  image_filename = 'picture.png'

  _id:string;
  _rev:string;

  imageURI:any;
  imageFileName:any;
  base64:any;
  cameraOptions: CameraOptions;
  blobImageUrl: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingProvider: ToastMessageProvider,
    public toastr: ToastsManager,
    public ngProgress: NgProgress,
    public contactProvider: ContactProvider,
    public contactGeneratorProvider: ContactGeneratorProvider,
    public http: Http,
    private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private sanitizer: DomSanitizer,
    
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');

    this.initTestFileInput()
    this.loadImage();
  }

  showSuccess() {
    this.toastr.success('You are awesome!', 'Success!');
  }

  showError() {
    this.toastr.error('This is not good!', 'Oops!');
  }

  showWarning() {
    this.toastr.warning('You are being warned.', 'Alert!');
  }

  showInfo() {
    this.toastr.info('Just some information for you.');
  }

  showCustom() {
    console.log("showCustom")
    this.toastr.custom('<span style="color: red">Message in red.</span>', null, { enableHTML: true });
  }

  testLoading() {
    //    this.loadingProvider.testLoading("Test")
  }

  hide() {
    //    this.loadingProvider.hide(null)
  }

  startProgress() {
    this.ngProgress.start();
  }

  doneProgress() {
    this.ngProgress.done();
  }

  randomizePicture() {
    this.contactGeneratorProvider.randomizePicture();
  }

  createRandomUsers() {
    this.contactGeneratorProvider.createRandomUsers(this.count);
  }

  deleteRandomUsers() {
    this.contactGeneratorProvider.deleteRandomUsers(this.count);
  }

  getContactPager() {
    this.contactProvider.getContactPager('contact-examples', true);
  }

 // ************************************************************************************
 // Fileupload Test
  initTestFileInput() {

    var self = this;
    var input = this.TestFileInputRef.nativeElement;
    var img = this.TestFileImgRef.nativeElement;

    input.addEventListener('change', function () {
      var file = input.files[0]; // file is a Blob

      console.log("Upload doc")

      self.contactProvider.dbLocal.get('fileupload').then(
        result => {

          //console.log ("result._attachments", result._attachments)
          //img.src = result._attachments.

          self.contactProvider.dbLocal.put({
            _id: "fileupload",
            _rev: result._rev,
            _attachments: {
              "picture.png": {
                content_type: 'text/plain',
                //type: file.type,
                data: file
              }
            }
          })
            .then(
            ok => { self.loadImage() })
            .catch(
            err => {
              console.log(err);
            });

        }
      )
    });
  }
  loadImage() {
    console.log("loadImage")
    var img = this.TestFileImgRef.nativeElement;
    this.contactProvider.dbLocal.getAttachment("fileupload", "picture.png").then(
      result => {
        console.log("loadImage result", result)
        var url = URL.createObjectURL(result);
        img.src = url;
      },
      error => console.log(error)
    );
  }
 // ************************************************************************************



  importContactPicture() {
    this.getImageBlobs().subscribe(
      data => {
        var doc = data['doc'] as Contact;
        var blob = data['blob'] as Blob;

        console.log("subscribed blob ", data);
        console.log("doc._id ", doc._id);
        console.log("doc._rev ", doc._rev);
        console.log("blob ", blob);

        this.contactProvider.dbLocal.putAttachment(doc._id, this.image_filename, doc._rev, blob, 'image/png').then(
          ok => console.log("putAttachment: ", ok),
          er => console.log("putAttachment: ", er)
        )
      })
  }


  deleteContactAttachments() {
    this.getAllContactsObservable().subscribe(
      data => {
        var doc = data as Contact;

        console.log("subscribed blob ", data);
        console.log("doc._id ", doc._id);
        console.log("doc._rev ", doc._rev);

        //db.removeAttachment(docId, attachmentId, rev, [callback])
        this.contactProvider.dbLocal.removeAttachment(doc._id, this.image_filename, doc._rev,
          cb => { console.log("removeAttachment", cb) })
      })
  }


  /*
    Load Images from Net
  */
  getImageBlobs() {
    var reqOptions:RequestOptionsArgs = {responseType: ResponseContentType.Blob}
    
    return new Observable(observer => {
      var importImg = this.ImportImgRef.nativeElement;
      var importCanvas = this.ImportCanvasRef.nativeElement;

      var counter: number = 0;
      var maxCount: number;
      var self = this;

      this.getAllContactsObservable().subscribe(
        result => {
          var doc = result as Contact;
          console.log("doc", doc);

          var timeout = setTimeout(function () {
            //            importImg.crossOrigin = "Anonymous";
            importImg.src = doc.picture;
            //importCanvas.getContext('2d').drawImage(importImg, 0, 0)

            self.http.get(doc.picture, reqOptions).subscribe(
              result => {
                console.log("result: ", result);
                let blob = result.blob()
                console.log("result: ", result, "blob ", blob);
                observer.next({ doc: doc, blob: blob });
              }
            )


          }, 10);

        }
      )

      return () => { } // release function
    });

  }

  getAllContactsObservable() {
    return new Observable(observer => {
      this.contactProvider.getAllContacts('contact-generated').then(
        result => {
          result.docs.forEach(item => {
            observer.next(item);
          })
        }
      )
    })
  }


  getAllContactsWithPictureObservable() {
    var self = this;
    return new Observable(observer => {
      this.getAllContactsObservable().subscribe(
        (result: any) => {
          self.contactProvider.dbLocal.getAttachment(result._id, this.image_filename).then(
            attachment => {
              result.attachment = attachment;
              observer.next(result);
            },

            error => {
              result.attachment = null;
              observer.next(result);
              
            }
          )
        }
      )
    })
  }

  getAllContactsWithPictureSubscribe() {
    var img = this.OutputImageRef.nativeElement;
    this.getAllContactsWithPictureObservable().subscribe(
      (result:any) => {
        console.log(result)
        if (result.attachment) {
          var url = URL.createObjectURL(result.attachment);
          img.src = url;
        }

        console.log(img.src);
      }
    )
  }




  getImageFromUrl() {
    var img = this.TestFileImgRef.nativeElement;
    var reqOptions:RequestOptionsArgs = {responseType: ResponseContentType.Blob}
    this.http.get('https://randomuser.me/api/portraits/women/12.jpg', reqOptions).subscribe(
      result => {
        console.log("result: ", result);        

        //let blob = new Blob([result.arrayBuffer()], { type: 'image/png' });
        let blob = result.blob();
        console.log("blob: ", blob);        
        
        var url = URL.createObjectURL(blob);
        console.log("createObjectURL: ", url);        
        
        img.src = url;
    }
    )
  }


  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  getImage() {
    this.cameraOptions  = {
      quality: 100,
      //destinationType: this.camera.DestinationType.FILE_URI,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 500,
      targetHeight: 500
    }
  
    this.camera.getPicture(this.cameraOptions).then((imageData) => {

      //console.lo

      //window.resolveLocalFileSystemURL(imageData, function success(fileEntry) {

      //}
        
      this.base64 = "data:image/jpeg;base64," + imageData;
      this.imageURI = imageData;

      console.log("imageData", JSON.stringify(imageData));

      var blob = b64toBlob(imageData, 'image/png', 512);
      this.blobImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob))

      console.log("blobImageUrl", JSON.stringify(this.blobImageUrl));
      
      this.contactProvider.dbLocal.get('2017-11-08T12:13:16.295Z').then(
        (contact:any) => {
          console.log("contact: ", contact);
          this.contactProvider.putPicture(contact, blob);
          console.log("putPicture", JSON.stringify({contact: contact, blob: blob}));
          
        },
        error => console.log("Error: ", error)
      )
      
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });

    // from https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
    function b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;
    
      var byteCharacters = atob(b64Data);
      var byteArrays = [];
    
      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);
    
        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
    
        var byteArray = new Uint8Array(byteNumbers);
    
        byteArrays.push(byteArray);
      }
    
      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
    }
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }


}
