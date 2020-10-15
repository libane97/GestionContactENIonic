import { Etudiant } from './../model/Etudiant';
import { Repository } from './Repository';
import { Storage } from '@ionic/storage';
import { Injectable, OnInit } from '@angular/core';
import { BaseModel } from '../model/BaseModel';


const ITEMS_KEY = 'my-item';
@Injectable({
  providedIn: 'root'
})
export class LsRepositoryService implements Repository {
  constructor(private storage: Storage) { }

  add(p: Etudiant): Promise<Etudiant> {
    return this.storage.get(ITEMS_KEY).then((items: Etudiant[]) => {
       if (items) {
         items.push(p);
         return this.storage.set(ITEMS_KEY, items);
       }else{
           return this.storage.set(ITEMS_KEY, [p]);
       }
    });
  }
  getAll(): Promise<Etudiant[]> {
    return this.storage.get(ITEMS_KEY);
  }
  edite(p:  Etudiant): Promise<Etudiant[]> {
   return this.storage.get(ITEMS_KEY).then((items: Etudiant[]) => {
       if (!items || items.length === 0) {return null;}
        let newItems: Etudiant[] = [];
        for (let i of items) {
            if (i.id === p.id) {
              newItems.push(p);
            }else {
                newItems.push(i);
            }
      }
      return this.storage.set(ITEMS_KEY, newItems);
   });
  }
  delete(p: Etudiant) : Promise<Etudiant[]> {
    return this.storage.get(ITEMS_KEY).then((items: Etudiant[]) => {
      if (!items || items.length === 0) {return null;}
          let tokeep:  Etudiant[] = []; 
          for(let i of items){
              if(i.id !== p.id){
                  tokeep.push(i);
              }
          }
          return this.storage.set(ITEMS_KEY, tokeep);
      });
  }

  find(): BaseModel[] {
    throw new Error('Method not implemented.');
  }
  getById(id: any): Promise<Etudiant> {
    throw new Error('Method not implemented.');
  }
}
