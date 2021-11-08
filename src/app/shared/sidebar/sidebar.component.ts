import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

//public items: string[] = [];

get Items() {
   return this.gifsSvc.historial;
}
  constructor(
    private gifsSvc: GifsService
  ) { }

  ngOnInit(): void {
  }

  buscar(item: string): void {
    this.gifsSvc.buscarGifs(item).subscribe(resp => { });
  }

}
