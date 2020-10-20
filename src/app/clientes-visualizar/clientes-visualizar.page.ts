import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Cliente } from '../model/clientes';
import { ClienteService } from '../services/clientes.service';

@Component({
  selector: 'app-clientes-visualizar',
  templateUrl: './clientes-visualizar.page.html',
  styleUrls: ['./clientes-visualizar.page.scss'],
})
export class ClientesVisualizarPage implements OnInit {

  cliente : Cliente = new Cliente();

  constructor(private clienteServ: ClienteService,
    private route: ActivatedRoute,
    private navCtrl: NavController) { }

  ngOnInit() {

    this.route.paramMap.subscribe(url=>{

      let id = url.get('id');
      console.log(id);

      this.clienteServ.buscaPorId(id).subscribe(response=>{

      //this.cliente = response; Erro nessa linha
      console.log(this.cliente);



      })

    })
  }

  atualizar(){

    this.navCtrl.navigateForward(['/clientes-atualizar',this.cliente.id]);
  }

  excluir(){

    this.navCtrl.navigateForward(['/clientes-excluir',this.cliente.id]);
  }

}
