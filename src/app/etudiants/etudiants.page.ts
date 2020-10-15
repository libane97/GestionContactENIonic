import { SqlRepositoryService } from './../service/sql-repository.service';
import { Etudiant } from './../model/Etudiant';
import { ToastController } from '@ionic/angular';
import { DatabaseService } from './../service/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.page.html',
  styleUrls: ['./etudiants.page.scss'],
})
export class EtudiantsPage implements OnInit {
  student: Etudiant = null;
  constructor(private router: Router, private route: ActivatedRoute,
     private db: DatabaseService, private toast: ToastController,
     private dbsql: SqlRepositoryService
     ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.dbsql.getById(id).then(data => {
        this.student = data;
      });
    });
  }

  updateStudentData() {
    this.dbsql.edite(this.student).then(async (res) => {
      let toast = await this.toast.create({
        message: 'Student Details Updated Successfully..',
        duration: 3000
      });
      toast.present();
    }).then(() => this.router.navigate(['etudiants']));
  }

}
