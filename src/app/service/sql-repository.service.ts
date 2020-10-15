import { Etudiant } from './../model/Etudiant';
import { Repository } from './Repository';
import { Injectable } from '@angular/core';
import { BaseModel } from '../model/BaseModel';
import { HttpClient } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Platform } from '@ionic/angular';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SqlRepositoryService implements Repository {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false); 
  etudiant = new BehaviorSubject([]);
  constructor(private plt: Platform, private sqliteporter:SQLitePorter,
    private sqlite: SQLite, private http: HttpClient
    ) { 
      this.plt.ready().then(()=>{
        this.sqlite.create({
           name: 'EtudiantDatabase.db',
           location: 'default'
        }).then((db: SQLiteObject) =>{
            this.database = db;
            this.seedDatabase();
        })
    })
    }
    seedDatabase(){
      this.http.get('assets/etudiantsScripte.sql', {responseType: 'text'})
      .subscribe(
         sql => {
             this.sqliteporter.importSqlToDb(this.database, sql)
             .then(_ => {
                  this.loadEtudiant();
                  this.dbReady.next(true);
             })
             .catch(e => console.error(e));
         });
   }
    loadEtudiant(){
        return this.database
        .executeSql('SELECT * FROM Etudiant', [])
        .then(data => {
          let etudiants: Etudiant[] = [];
          if (data.rows.length > 0){
              for (let i = 0; i < data.rows.length; i++) {
                 etudiants.push({
                  id: data.rows.item(i).id,
                  nom: data.rows.item(i).nom,
                  class: data.rows.item(i).class,
                  mark: data.rows.item(i).mark,
                 });
              }
          }   
          this.etudiant.next(etudiants);        
        })
    }
  getAll() {
    return this.etudiant.asObservable();
  }
  add(p: Etudiant) {
    let data = [p.nom,p.class,p.mark]; 
    return this.database.executeSql('INSERT INTO Etudiant(nom,class,mark) VALUES (?,?,?)', data)
    .then(_ => {
         this.loadEtudiant();
    });
  }
  getById(id): Promise<Etudiant>{
    return this.database.executeSql('SELECT * FROM Etudiant WHERE id = ?', [id]).then(data => {
      return {
        id: data.rows.item(0).id,
        nom: data.rows.item(0).nom,
        class: data.rows.item(0).class,
        mark: data.rows.item(0).mark
      };
    });
  }
  edite(p: Etudiant) {
    let data = [p.nom, p.class, p.mark];
    return this.database.executeSql(`UPDATE Etudiant SET nom = ?, class = ?, mark = ? WHERE id = ${p.id}`, data).then(data => {
      this.loadEtudiant();
    });
  }
  delete(id) {
   // let data = [p.id, p.nom, p.class, p.mark];
    console.log('ID '+ id);
      return this.database.executeSql('DELETE FROM Etudiant WHERE id = ?', [id]).then(_ => {
        this.loadEtudiant();
      });
  }
  find(): BaseModel[] {
    throw new Error('Method not implemented.');
  }
}
