import { Platform } from '@ionic/angular';
import { LsRepositoryService } from './../service/ls-repository.service';
import { SqlRepositoryService } from './../service/sql-repository.service';
import { Router } from '@angular/router';
import { DatabaseService } from './../service/database.service';
import { Component, OnInit } from '@angular/core';
import { Etudiant } from './../model/Etudiant';
@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.page.html',
  styleUrls: ['./etudiant.page.scss'],
})
export class EtudiantPage implements OnInit {
  student: Etudiant = null;
  etudiant: Etudiant = new Etudiant();
  etudiants: Etudiant[] = [];
  constructor(private db: DatabaseService,private route: Router,private dbsql: SqlRepositoryService,private plt: Platform) {
    
    this.plt.ready().finally(() => {
      this.getetudiant();
  });
   }

  ngOnInit() {
      
}
   getetudiant(){
    this.dbsql.getAll()
    .subscribe(res => {
     this.etudiants = res;
     console.log(this.etudiants);
 });  
   }
  addEtudiant(){
      console.log(this.etudiant);
      this.dbsql.add(this.etudiant)
      .then(_ => {
       console.log(this.etudiant);
      });
  }
  onedite(id){
    this.route.navigate(['etudiants', id]);
    console.log(id);
  }

  delete(e){
    console.log("delete "+e.id);
    this.dbsql.delete(e.id).then(() => {
      this.route.navigate(['etudiant']);
    });
  }
}
