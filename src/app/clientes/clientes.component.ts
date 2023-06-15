import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getClientes().pipe(
      tap( cliente_Tap3 => {
        this.clientes = cliente_Tap3
        console.log("ClienteService - Tap3 (Cliente)");
        cliente_Tap3.forEach( cliIt => {
          console.log(cliIt.nombre);
        });
      })
    ).subscribe(
      //OPC 1 (directa) clientes => this.clientes = clientes
      //OPC2 (Function - OLD)
      /* function (clientes)  {
        this.clientes = clientes;
      } */
      //OPC 3 (llaves -> SEMI-OPTIMA -para una linea mejor la opc 1-)
      /* (clientes) => {
        this.clientes = clientes
      } */

      /*
      Al meter el tap, se puede subir esto alli.. aunque no es un sub, sino un obser 
      clientes => this.clientes = clientes 
      */
      clientes => this.clientes = clientes 
    );
  }

  delete(cliente : Cliente) : void {
    Swal.fire({
      title: `¿Desea eliminar el cliente ${cliente.nombre} ${cliente.apellido}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(response => {
          this.clientes = this.clientes.filter(cli => cli !== cliente)
        });
        Swal.fire(`¡El cliente '${cliente.nombre} ${cliente.apellido}' ha sido eliminado!`, '', 'success')
      } /* else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      } */
    })
  }

}
