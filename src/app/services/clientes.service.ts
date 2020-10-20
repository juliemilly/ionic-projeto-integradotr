import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AnySrvRecord } from 'dns';
import { from, Observable } from 'rxjs';
import { Cliente } from '../model/clientes';

@Injectable()
export class ClienteService{

    cliente : Cliente = new Cliente();

    constructor(private firestore: AngularFirestore){


    }

    listaDeClientes() : Observable<any>{

        return from(new Observable(observe =>{

            this.firestore.collection('cliente').snapshotChanges().subscribe(response=>{

            let lista: Cliente[] = [];
            response.map(obj =>{

                let cliente: Cliente = new Cliente();
                cliente.setData(obj.payload.doc.data());
                cliente.id = obj.payload.doc.id;
                lista.push(cliente);
                
            });

            observe.next(lista);
            
            })

        }))
    }

   cadastrar(cliente : any) : Observable<any>{
         
    return from(new Observable(Observe =>{

        this.firestore.collection('cliente').add(cliente).then(response=>{
            Observe.next("Cadastrado com sucesso");
        },(err) =>{
            
            Observe.error("Erro ao cadastrar");

        })

    }));

   } 

   buscaPorId(id : any){

    return from(new Observable(Observe =>{

        this.firestore.collection('cliente').doc(id).snapshotChanges().subscribe(response=>{

            let cliente : Cliente = new Cliente();
            cliente.id = response.payload.id;
            cliente.setData(response.payload.data());
            Observe.next(cliente);
            console.log(response);
        },(err) =>{
            
            Observe.error("Erro ao buscar o id");


        })

    }));

   }

   atualizar(cliente : any): Observable<any>{

    return from(new Observable(Observe =>{

        this.firestore.collection('cliente').doc(cliente.id).set(cliente).then(response=>{
            Observe.next("Atualizado com sucesso");
        },(err) =>{
            
            Observe.error("Erro ao atualizar");

        })

    }));

   }

   excluir(cliente : any): Observable<any>{

    return from(new Observable(Observe =>{

        this.firestore.collection('cliente').doc(cliente.id).delete().then(response=>{
            Observe.next("Excluido com sucesso");
        },(err) =>{
            
            Observe.error("Erro ao excluir");

        })

    }));


   }

}