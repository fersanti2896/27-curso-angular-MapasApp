import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map } from 'mapbox-gl';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})

export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  constructor(private placesService: PlacesService) { }

  ngAfterViewInit(): void {
    if( !this.placesService.useLocation ) throw new Error('No hay placesService.useLocation');

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style    : 'mapbox://styles/mapbox/streets-v11',
      center   : this.placesService.useLocation, 
      zoom     : 13
    });
    map.on('style.load', () => {
      map.setFog({});
    });  
  }
}
