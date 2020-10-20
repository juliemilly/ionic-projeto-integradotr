import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Cliente } from '../model/clientes';
import { ClienteService } from '../services/clientes.service';
import { TemplateService } from '../services/template.service';

@Component({
  selector: 'app-clientes-atualizar',
  templateUrl: './clientes-atualizar.page.html',
  styleUrls: ['./clientes-atualizar.page.scss'],
})
export class ClientesAtualizarPage implements OnInit {

  FormGroup : FormGroup;

  cliente : Cliente = new Cliente();

  constructor(private clienteServ: ClienteService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private template: TemplateService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(url=>{

      let id = url.get('id');
      console.log(id);

      this.clienteServ.buscaPorId(id).subscribe(response=>{

      //this.cliente = response;
      this.IniciarForm();



      })

    })
  }

  atualizar(){
    this.template.loading.then(load=>{
    
    load.present();

    this.clienteServ.atualizar(this.FormGroup.value).subscribe(response=>{

      console.log("Ok");
      load.dismiss();
      this.template.myAlert(response);

    },erro =>{

      console.log("Erro");
      load.dismiss();
      this.template.myAlert("Erro ao cadastrar");


    
    })
  })
  }


  IniciarForm(){

    this.FormGroup = this.formBuilder.group({

      id:[this.cliente.id],
      nome : [this.cliente.nome],
      cpf : [this.cliente.cpf],
      endereco : [this.cliente.endereco],
      numero : [this.cliente.numero],
      cidade : [this.cliente.cidade],
      estado : [this.cliente.estado],
      email : [this.cliente.email],
      telefone : [this.cliente.telefone]

    })
  }

}
