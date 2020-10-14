import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/clientes';
import { ClienteService } from '../services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  cliente : Cliente = new Cliente();
  lista: any;

  constructor(private clienteServ: ClienteService) {


   }

  ngOnInit() {
   this.clienteServ.listaDeClientes().subscribe(response =>{

    console.log(response);//remover depois de testar
    this.lista = response;
    console.log(this.lista);

   }, err =>{


   })

  }

}
