import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {
  
  get result() {
    return this.gifsSvc.resultado;
  }

  constructor(
    private gifsSvc: GifsService
  ) { }

  ngOnInit(): void {
  }


}
