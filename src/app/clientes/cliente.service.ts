//import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private staticUrlBasic : string = 'http://localhost:8080/api'
  constructor(private http : HttpClient) { }

  /* SINCRONO SIN OBSERVABLE getClientes(): Cliente[] {return CLIENTES;}; */

  /* ASINCRONO CON OBSERVABLE - ANTIGUO ANTES DE CONECTAR A SPRINBOOT CON HTTPCLIENTMODULE*/
  /* getClientes(): Observable<Cliente[]> {
    return of(CLIENTES);
  } */
  getClientes(): Observable<Cliente[]> {
    // OPCION 1:
    //return this.http.get<Cliente[]>( (this.staticUrlBasic + '/clientes') )

    // OPCION 2
    return this.http.get( (this.staticUrlBasic + '/clientes') ).pipe(
      map( response => response as Cliente[] )
    )
  }

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  create(cliente : Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(this.staticUrlBasic  + '/clientes/', cliente, {headers: this.httpHeaders})
  }

  getCliente(clienteId: number): Observable<Cliente> {
    return this.http.get<Cliente>(this.staticUrlBasic + `/clientes/${clienteId}`)
  }

  update(cliente : Cliente) : Observable<Cliente> {
    return this.http.put<Cliente>(this.staticUrlBasic + `/clientes/${cliente.id}`, cliente, {headers: this.httpHeaders});
  }

}
