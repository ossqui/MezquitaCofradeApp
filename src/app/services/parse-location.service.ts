import { Injectable } from '@angular/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { LatLng } from '@ionic-native/google-maps/ngx';

@Injectable({
  providedIn: 'root'
})
export class ParseLocationService {

  constructor(
    private nativeGeocoder: NativeGeocoder
  ) { }

  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  public parseDireccion(coordenadas: LatLng): Promise<NativeGeocoderResult[]> {
    return this.nativeGeocoder.reverseGeocode(coordenadas.lat, coordenadas.lng, this.options)
      .then(result => {
        return result;
      });
  }

  public parseCoordenadas(direccion: string): Promise<NativeGeocoderResult[] | string[]> {
    let coordenadas: string[];
    return this.nativeGeocoder.forwardGeocode(direccion, this.options)
      .catch((result: NativeGeocoderResult[]) => {
        coordenadas.push(result[0].latitude);
        coordenadas.push(result[0].longitude);
        return coordenadas;
      })
  }
}
