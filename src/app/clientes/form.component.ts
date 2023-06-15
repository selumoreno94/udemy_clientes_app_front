import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  //styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private cliente : Cliente = new Cliente();
  private titulo : string = "Crear cliente";
  private errores: string[] = [];


  constructor(
    private clienteService : ClienteService, 
    private router : Router, 
    private activateRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  /**
   * create
   */
  public create() : void {
    console.log(this.cliente)
    this.clienteService.create(this.cliente).subscribe(
      //response => this.router.navigate(['/clientes'])
      cliente => {
        this.router.navigate(['/clientes'])
        Swal.fire("Nuevo cliente", `Cliente ${cliente.nombre} creado con exito`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo de error desde backend: ' + err.status + ' | MSG = ' + err.error.errors);
      }
      /* //PONIENDOLO CON ANY 
      jsonResp => {
        this.router.navigate(['/clientes'])
        Swal.fire("Nuevo cliente", `${jsonResp.mensaje}: ${jsonResp.cliente.nombre}`, 'success')
      } */
    )
  }

  public getCliente() : Cliente {
    return this.cliente
  }

  public getTitulo() : string {
    return this.titulo
  }

  public getErrores() : string[] {
    return this.errores;
  }

  cargarCliente() : void {
    this.activateRoute.params.subscribe(params => {
      let clienteId = params['id'];
      if (clienteId) {
        this.clienteService.getCliente(clienteId).subscribe( (cliente) => this.cliente = cliente)
      }
      /* clienteId != null ? this.clienteService.getCliente(clienteId).subscribe({
        (cliente) => this.cliente = this.cliente
      }) : null */
    })
  }

  update():void {
    this.clienteService.update(this.cliente).subscribe(
      /* clienteResp => { 
        this.router.navigate(["/clientes"]);
        Swal.fire('Cliente Actualizado', `Cliente ${clienteResp.nombre} actualizado con exito`, 'success');
      } */
      jsonResp => {
        this.router.navigate(['/clientes'])
        Swal.fire("Nuevo cliente", `${jsonResp.mensaje}: ${jsonResp.cliente.nombre}`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo de error desde backend: ' + err.status + ' | MSG = ' + err.error.errors);
      }
    );
  }

}
