import { LngLatLike } from './../../../../node_modules/@types/mapbox-gl/index.d';
import { Injectable } from '@angular/core';
import { Map } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: Map | undefined;

  get isMapReady() {
    return !!this.map;
  }

  setMap( map: Map ) {
    this.map = map;
  }

  /* Con esto podemos  */
  flyTo( coords: LngLatLike ) {
    if( !this.isMapReady ) throw new Error('El mapa no esta inicializado');

    this.map?.flyTo({
      zoom: 14, 
      center: coords
    })
  }
}
