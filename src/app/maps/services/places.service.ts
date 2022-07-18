import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api';
import { PlacesRespone, Feature } from '../interfaces/places';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  public useLocation   ?: [number, number] = undefined;
  public isLoadingPlaces: boolean = false;
  public places         : Feature[] = [];
  
  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor(private placesApi: PlacesApiClient,
              private mapService: MapService) {
    this.getUserLocation();
  }

  /* Método para saber cuando ya tenga la localización */
  public async getUserLocation(): Promise<[number, number]> {
    return new Promise( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        (err) => {
          alert('No se pudo obtener la geocalización');
          reject();
        }
      );
    });
  }

  /* Metodo que busca un lugar */
  getPlacesByQuery( query: string = '' ){
    if( query.length === 0 ) {
      this.places = [];
      this.isLoadingPlaces = false;

      return;
    }

    if( !this.useLocation ) throw Error('No hay useLocation')

    this.isLoadingPlaces = true;

    this.placesApi.get<PlacesRespone>(`/${ query }.json`, {
      params: {
        proximity: this.useLocation.join(',')
      }
    }).subscribe( resp => {
        this.isLoadingPlaces = false;
        this.places          = resp.features;
        this.mapService.createMarkersFromPlaces(this.places, this.useLocation!);
      });
  }
}
