import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private base:AngularFireDatabase) { }

  public getDatos(){
    return this.base.list('tiendas').valueChanges();
  }

  public guardarData(dato){
    let key=this.base.list('/tiendas/').push(dato).key;
    dato.id = key;
    this.base.database.ref('tiendas/' + dato.id).set(dato);
  }
  
}
