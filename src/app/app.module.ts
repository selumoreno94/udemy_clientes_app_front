import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Imports Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';

// Imports Services
import { ClienteService } from './clientes/cliente.service';

//Import Routing
import { RouterModule, Routes } from '@angular/router';

// Import HttpClient - para implementacion de comunicacion con backend - metodos get/put/post/update
import { HttpClientModule } from "@angular/common/http";

// Import de librerias form
import { FormComponent } from './clientes/form.component';
import { FormsModule, NgForm } from '@angular/forms';

const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    //NgForm
  ],
  exports: [
    RouterModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})

export class AppModule { }
