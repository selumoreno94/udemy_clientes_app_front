import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      //OPC 1 (directa) clientes => this.clientes = clientes
      //OPC2 (Function - OLD)
      /* function (clientes)  {
        this.clientes = clientes;
      } */
      //OPC 3 (llaves -> SEMI-OPTIMA -para una linea mejor la opc 1-)
      /* (clientes) => {
        this.clientes = clientes
      } */
      clientes => this.clientes = clientes
    );
  }

}
