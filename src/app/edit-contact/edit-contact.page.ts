import { ResourceService } from './../service/resource.service';
import { contact } from './../model/contact';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {

  data: any;
  message: any;
  contact: contact = new contact();
  constructor(private resource: ResourceService, private route: ActivatedRoute, private router: Router, public toastController: ToastController) { }
  idcontact: any;

  ngOnInit() {
    this.route.paramMap.subscribe (params => { 
      this.idcontact = params.get("id") 
    });
    this.resource.getById(this.idcontact)
    .subscribe(
      res => {
        this.data = res;
        console.log(res);
        this.contact=this.data;
        console.log(this.contact);

      },
      err => console.log(err)
    );
  }
    update()
    {
      this.resource.updateobject(this.contact)
      .subscribe(
        res => {
              console.log(res);
              this.router.navigate(['home']);
              this.presentToast();
        },
        err => console.log(err)
      );
    //  console.log(this.contact);
      
    }

    async presentToast() {
      const toast = await this.toastController.create({
        color: 'success',
        message: 'le contact à ete modifier avec success',
        duration: 3000
      });
      toast.present();
    }



   
}
