import { HttpClient } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Etudiant {
    id: number;
    nom: string;
    class: string;
    mark: string;
}
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

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
        addetudiant(etudnom, etudclass, etudmark) {
             let data = [etudnom,etudclass, etudmark]; 
             return this.database.executeSql('INSERT INTO Etudiant(nom,class,mark) VALUES (?,?,?)', data)
             .then(_ => {
                  this.loadEtudiant();
             });
        }
    getDatabaseState(){
        return this.dbReady.asObservable();
    }
    getEtudiant(): Observable<Etudiant[]>{
        return this.etudiant.asObservable();
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

    getStudentById(id): Promise<Etudiant> {
      return this.database.executeSql('SELECT * FROM Etudiant WHERE id = ?', [id]).then(data => {
        return {
          id: data.rows.item(0).id,
          nom: data.rows.item(0).nom,
          class: data.rows.item(0).class,
          mark: data.rows.item(0).mark
        };
      });
    }
    updateStudent(student: Etudiant) {
      let data = [student.nom, student.class, student.mark];
      return this.database.executeSql(`UPDATE Etudiant SET nom = ?, class = ?, mark = ? WHERE id = ${student.id}`, data).then(data => {
        this.loadEtudiant();
      });
    }
    deleteStudent(id) {
      console.log('le supprime à ete fais avec success '+ id);
      return this.database.executeSql('DELETE FROM Etudiant WHERE id = ?', [id]).then(_ => {
        this.loadEtudiant();
      });
    }
}
