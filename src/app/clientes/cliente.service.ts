//import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe, formatDate, registerLocaleData } from '@angular/common';

//INTERNACIOLAZICACION


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private staticUrlBasic : string = 'http://localhost:8080/api'
  constructor(private http : HttpClient, private router : Router) { }

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
      tap( (respTap_Obj : any) => {
        (respTap_Obj.content as Cliente[]).forEach( cliIt => {
          console.log(cliIt.nombre);
        })
      }),
      map( (response : any) => {
        //let clientes = response as Cliente[];

        //return clientes.map(cliente => {
          return (response as Cliente[]).map(cliente => {
          // MOD FRONT VISUAL MAYUSCULAS
          cliente.nombre = cliente.nombre.toUpperCase();
          // CAMBIO FECHA
          // a) OPCION 1: FormatDate
          //cliente.createAt = formatDate(cliente.createAt, 'dd/MM/yyyy', 'en-ES');
          
          //cliente.createAt = formatDate(cliente.createAt, 'EEEE dd, MMMM yyyy', 'es');

          // b) OPCION 2: DATEPIPE
          let datePipe = new DatePipe('es');
          /* let cli_createAt: any = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          cliente.createAt = cli_createAt; */

          return cliente;
        });
      }),
      tap(respTap_Cli => {
        console.log("ClienteService - Tap2 (Cliente)");
        respTap_Cli.forEach( cliIt => {
          console.log(cliIt.nombre);
        })
      })
    )
  }

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  create(cliente : Cliente) : Observable<Cliente> {
    return this.http.post(this.staticUrlBasic  + '/clientes/', cliente, {headers: this.httpHeaders}).pipe(
      map( (objectResponse: any) => objectResponse.cliente as Cliente),
      catchError(err => {
        //this.router.navigate(['/clientes']);

        if (err.status == 400) {
          return throwError(err);
        }

        console.log(err.error.mensaje);
        Swal.fire(err.error.mensaje, err.error.error, 'error');
        return throwError(err);
      })
    );
  }

  getCliente(clienteId: number): Observable<Cliente> {
    return this.http.get<Cliente>(this.staticUrlBasic + `/clientes/${clienteId}`).pipe(
      catchError(err => {
        this.router.navigate(['/clientes']);
        console.log(err.error.mensaje);
        Swal.fire('Error al obtener cliente', err.error.mensaje, 'error');
        return throwError(err);
      })
    );
  }

  update(cliente : Cliente) : Observable<any> {
    return this.http.put<Cliente>(this.staticUrlBasic + `/clientes/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(err => {
        //this.router.navigate(['/clientes']);

        if (err.status == 400) {
          return throwError(err);
        }

        console.log(err.error.mensaje);
        Swal.fire(err.error.mensaje, err.error.error, 'error');
        return throwError(err);
      })
    );
  }

  delete(clienteId: number) : Observable<Cliente> {
    return this.http.delete<Cliente>(this.staticUrlBasic + `/clientes/${clienteId}`, {headers: this.httpHeaders}).pipe(
      catchError(err => {
        this.router.navigate(['/clientes']);
        console.log(err.error.mensaje);
        Swal.fire(err.error.mensaje, err.error.error, 'error');
        return throwError(err);
      })
    );
  }

}
