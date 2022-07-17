import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl';
 
Mapboxgl.accessToken = 'pk.eyJ1IjoiZmVyc2FudGkyODk2IiwiYSI6ImNsMTY2ODJkZDFjODEzam4xOHF3MHd4ZmUifQ.RsFbWHhoLXki0KB8ylwqXg';

if (!navigator.geolocation) {
  alert('Navegador no soport la Geocalización!');
  
  throw new Error('Navegador no soporta el Geocalización!');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
