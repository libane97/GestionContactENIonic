import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { contact } from '../model/contact';
import { ResourceService } from '../service/resource.service';

@Component({
  selector: 'app-selected-contactby-id',
  templateUrl: './selected-contactby-id.page.html',
  styleUrls: ['./selected-contactby-id.page.scss'],
})
export class SelectedContactbyIdPage implements OnInit {
  idcontact: any;
  data: any;
  contact: contact = new contact();
  constructor(private resource: ResourceService, private route: ActivatedRoute,
     private router: Router, public toastController: ToastController) { }

  ngOnInit() {
    this.route.paramMap.subscribe (params => { 
      this.idcontact = params.get("id");
      console.log(this.idcontact);
    });
    this.resource.getById(this.idcontact)
    .subscribe(
      res => {
        this.data = res;
        console.log(res);
        this.contact = this.data;
        console.log(this.contact);

      },
      err => console.log(err)
    );
  }
  onreturn(){
    this.router.navigate(['home']);
  }
}
