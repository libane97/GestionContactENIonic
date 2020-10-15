import { contact } from './../model/contact';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private basepath = 'http://192.168.1.15:8000/api';
  constructor(private http: HttpClient) { }
   getAll(){
    return this.http.get(this.basepath+"/contact");
   }
   getByTelephone(telephone){
    return this.http.get(this.basepath+"/contact/"+telephone);
   }
   createobject(contact){
       return this.http.post(this.basepath+"/contact", contact);
   }
   deleteobject(contact_id){
    return this.http.delete(this.basepath+"/contact/"+contact_id);
  }
   getById(id){
    return this.http.get(this.basepath+"/contact/"+id);
  }

  updateobject(contact:contact){
    return this.http.patch(this.basepath+"/contact/"+contact.id, contact);
  }

  getPost(){
    return this.http.get(this.basepath+"/post");
  }

}
