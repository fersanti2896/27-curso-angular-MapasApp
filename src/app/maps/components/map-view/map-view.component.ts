import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})

export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  constructor(private placesService: PlacesService, 
              private mapService: MapService) { }

  ngAfterViewInit(): void {
    if( !this.placesService.userLocation ) throw new Error('No hay placesService.useLocation');

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style    : 'mapbox://styles/mapbox/streets-v11',
      center   : this.placesService.userLocation, 
      zoom     : 13
    });

    const popup = new Popup()
        .setHTML(`
          <h6>¡Aquí estoy!</h6>
          <span>Estoy en este lugar del mundo</span>
        `);
    
    /* Los popus se conecta a un marcador */
    new Marker({ color: 'red' })
        .setLngLat( this.placesService.userLocation )
        .setPopup( popup )
        .addTo( map );

    this.mapService.setMap(map);
  }
}
