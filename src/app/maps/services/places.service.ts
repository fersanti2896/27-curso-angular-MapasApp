import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  public useLocation?: [number, number] = undefined;
  
  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor() {
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
          console.log(err);
          reject();
        }
      );
    });
  }
}
