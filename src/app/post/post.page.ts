import { finalize, map } from 'rxjs/operators';
import { Post } from './../model/Post';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ResourceService } from './../service/resource.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  data: Post[];
  cpt: number;
  tab: any;
  objet: any;
  constructor(private resource: ResourceService, private route: Router, public loadingController: LoadingController) { }

  ngOnInit() {
    this.getPost();
     }
  async getPost() {
    const loader = await this.presentLoading();
    this.resource.getPost().pipe(map((res: any[]) => {
       this.data = res.map(d => Post.fromJson(d))
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
  async presentLoading() {
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

  addcomment(){
      console.log('test parfait');
      
  }
  onLike(d){
       console.log(d);
      
  }
}
