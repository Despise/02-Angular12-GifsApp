import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private readonly _API_KEY_: string = 'xwmp3sIZpVBBTpTXjbWTJemlRRUKrtxQ';
  private readonly _BASE_URL_: string = 'https://api.giphy.com/v1/gifs';
  private _historialBusqueda: string[] = [];
  public resultado:Gif[] = [];

  constructor(
    private http: HttpClient
  ) {

    this._historialBusqueda = JSON.parse( localStorage.getItem( 'historial' )! ) || [];

    this.resultado = JSON.parse( localStorage.getItem( 'ultimosResultados' )! ) || [];
    // if( localStorage.getItem( 'historial' ) ) {
    //   this._historialBusqueda = JSON.parse( localStorage.getItem( 'historial' )! )
    // }
   }

  get historial() {
    return [...this._historialBusqueda];
  }

  buscarGifs( query: string ): Observable<Gif[]> {

    query = query.trim().toLowerCase();

    if( !this._historialBusqueda.includes( query ) && query !== '' ) {
      this._historialBusqueda.unshift( query );
      this._historialBusqueda = this._historialBusqueda.splice(0,10);

      localStorage.setItem('historial', JSON.stringify( this._historialBusqueda ));
    }

    const params = new HttpParams()
      .set('api_key', this._API_KEY_)
      .set('limit', '20')
      .set('q', query)

    return this.http.get<SearchGifsResponse>( `${ this._BASE_URL_ }/search`, { params } )
      .pipe(
        map( (resp) => {
          this.resultado = resp.data; 
          localStorage.setItem( 'ultimosResultados', JSON.stringify( resp.data ) );
          return resp.data
        })
      );
  }
}
