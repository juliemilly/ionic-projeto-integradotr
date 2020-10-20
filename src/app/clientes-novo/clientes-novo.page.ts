import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClienteService } from '../services/clientes.service';
import { TemplateService } from '../services/template.service';

@Component({
  selector: 'app-clientes-novo',
  templateUrl: './clientes-novo.page.html',
  styleUrls: ['./clientes-novo.page.scss'],
})
export class ClientesNovoPage implements OnInit {
  
   formGroup : FormGroup;

   
  constructor(private formBuilder: FormBuilder,
    private template: TemplateService,
    private ClienteServ: ClienteService) {

      this.IniciarForm();


     }

  ngOnInit() {
  }

  IniciarForm(){

    this.formGroup = this.formBuilder.group({

      nome : [],
      cpf : [],
      endereco : [],
      numero : [],
      cidade : [],
      estado : [],
      email : [],
      telefone : []

    })
  }

  cadastrar(){
    this.template.loading.then(load=>{
    
    load.present();

    this.ClienteServ.cadastrar(this.formGroup.value).subscribe(response=>{

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

}
