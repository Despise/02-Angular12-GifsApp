import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
})
export class BusquedaComponent implements OnInit {

// para obtener el elemento HTML con el nombre que se coloco en #nombre
@ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  // SE INYECTA POR "DI" EL SERVICE
  constructor(
    private gifsSvc: GifsService
  ) {}

  ngOnInit(): void {}

  buscar() {

    const query = this.txtBuscar.nativeElement.value;

    //console.log( this.txtBuscar.nativeElement.value );

    this.gifsSvc.buscarGifs( query ).subscribe(q => {
      console.log(q);
    });

    this.txtBuscar.nativeElement.value = '';
  }
}
