import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  /* SINCRONO SIN OBSERVABLE getClientes(): Cliente[] {return CLIENTES;}; */

  /* ASINCRONO CON OBSERVABLE*/
  getClientes(): Observable<Cliente[]> {
    return of(CLIENTES);
  }
}
