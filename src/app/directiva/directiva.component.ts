import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  //styleUrls: ['./directiva.component.css']
})
/*export class DirectivaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}*/

export class DirectivaComponent {

  listaCurso: string[] = ['TP', 'JS', 'J2EE', 'C#', 'PHP']
  constructor() { }

  habilitar: boolean = true;

  changeHabilitar() : void {
    this.habilitar = !this.habilitar;
  }
}
