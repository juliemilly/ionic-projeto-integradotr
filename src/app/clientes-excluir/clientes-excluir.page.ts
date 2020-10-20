import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Cliente } from '../model/clientes';
import { ClienteService } from '../services/clientes.service';
import { TemplateService } from '../services/template.service';


@Component({
  selector: 'app-clientes-excluir',
  templateUrl: './clientes-excluir.page.html',
  styleUrls: ['./clientes-excluir.page.scss'],
})
export class ClientesExcluirPage implements OnInit {

  cliente : Cliente = new Cliente();

  constructor(private clienteServ: ClienteService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private template: TemplateService) { }

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

  excluir(){
    this.clienteServ.excluir(this.cliente).subscribe(response=>{

      this.template.loading.then(load=>{
    
        load.present();
    
        this.clienteServ.excluir(this.cliente).subscribe(response=>{
    
         
          load.dismiss();
          this.navCtrl.navigateForward(['/clientes']);
    
        },erro =>{
    
          console.log("Erro");
          load.dismiss();
          this.template.myAlert("Erro ao cadastrar");
    
    
        
        })
      })
    })
  }


}
