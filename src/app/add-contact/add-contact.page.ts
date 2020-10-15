import { Router } from '@angular/router';
import { contact } from './../model/contact';
import { ResourceService } from './../service/resource.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {

  data: any;
  contact:contact = new contact();
              constructor(private resource:ResourceService, private router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }

  savecontact(){
      console.log(this.contact); 
      if(this.contact){
        this.resource.createobject(this.contact)
        .subscribe(
          res => {
            console.log(res);
            this.router.navigate(['home']);
            //this.contact.push(this.contact);
            this.presentToast();
          },
          err => console.log(err)
        );  
        this.contact.name = ""
        this.contact.telephone = ""
        this.contact.address = ""
        this.contact.civility = ""
      }
  }
async presentToast() {
    const toast = await this.toastController.create({
      color: 'success',
      message: 'le contact à ete crée avec success',
      duration: 2000
    });
    toast.present();
  }
  annulercontact(){
    this.contact.name = ""
    this.contact.telephone = ""
    this.contact.address = ""
    this.contact.civility = ""
  }

}
