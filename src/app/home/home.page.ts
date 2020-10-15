import { contact } from './../model/contact';
import { ResourceService } from './../service/resource.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import {finalize, map} from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  data: contact[];
  telephone: any;
  imageURL: any;
  constructor(private resource: ResourceService, private route: Router,
              public toastController: ToastController,
              private alertController: AlertController,
              private camera: Camera,
              private storage: Storage,
              public loadingController: LoadingController
              ) {
                sourceType: this.camera.PictureSourceType.CAMERA;
              }
              image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
  ngOnInit(): void {
    this.getdata();
  //  this.storage.set('name', 'libane');
    // Or to get a key/value pair
    // this.storage.get('name').then((name) => {
    //   console.log('Your age is', name);
    // });
    
  }

  async getdata(){
  const loader = await this.presentLoading();
    this.resource.getAll().pipe(map((res: any[]) => {
       this.data = res.map(d => contact.fromJson(d))
       console.log(this.data);
       return this.data
    }),
       finalize(() => loader.dismiss())
    ).subscribe((res: any[]) => {
        console.log(res);
    },  err => {
         console.log(err); 
    }
    );
  }

  // OnSearch(){
  //     this.resource.getByTelephone(this.telephone)
  //     .subscribe(res => {
  //       console.log(res);    
  //       this.data = res;   
  //   },  err => {
  //        console.log(err); 
  //   }
  //   );
  // }

  ondelete(id:number)
  {
     
    console.log(id);
    if (this.presentAlertConfirm(id)) {
      this.resource.deleteobject(id)
    .subscribe(
      res => {
            console.log(res);
            this.route.navigate(['home']);
      },
      err => console.log(err)
    );
    }
  }
  onedite(id: number)
  {
   this.route.navigate(['edit-contact', id]);
   console.log(id);
  }
  Onadd(){
    this.route.navigate(['add-contact']);
  }
  toast(){
    const button = document.querySelector('ion-button');
    button.addEventListener('click', handleButtonClick);

    async function handleButtonClick() {
      const toast = await this.toastController.create({
        color: 'dark',
        duration: 2000,
        message: 'Paired successfully',
        showCloseButton: true
      });

      await toast.present();
    }
  }


  async presentAlertConfirm(d) {
    const alert = await this.alertController.create({
      cssClass: 'danger',
      header: 'Confirm!',
      message: 'Voulez vous vraiment supprime le contact ' + d.name + d.telephone,
      buttons: [
        {
          text: 'Annuler',
          role: 'annuler',
          cssClass: 'danger',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.resource.deleteobject(d.id)
              .subscribe(
                res => {
                      console.log(res);
                      this.route.navigate(['home']);
                      const idx = this.data.findIndex(c => c.id == d.id);
                      this.data.splice(idx,1);
                      this.presentToast();
                },
                err => console.log(err)
              );
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      color: 'success',
      message: 'le contact à ete supprime avec success',
      duration: 2000
    });
    toast.present();
  }
  onselectedcontact(d){
      console.log(d.id);
      this.route.navigate(['selected-contactby-id', d.id]);
  }
  async addPhoto(source: string) {
    if (source === 'camera') {
      console.log('camera');
      const cameraPhoto = await this.openCamera();
      this.image = 'data:image/jpg;base64,' + cameraPhoto;
    } else {
      console.log('library');
      const libraryImage = await this.openLibrary();
      this.image = 'data:image/jpg;base64,' + libraryImage;
    }
  }

  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }

  async openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    return await this.camera.getPicture(options);
  }

  async presentLoading() {
    console.log("y'a quoi ??");
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...', 
      //duration: 2000
    });

    loading.present();
   // const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    return loading;
  }

  addPost(){
    this.route.navigate(['post']);
  }

  etudiant(){
    this.route.navigate(['etudiant']);
  }
  etudiantls(){
    this.route.navigate(['etudiantls']);
  }
}

