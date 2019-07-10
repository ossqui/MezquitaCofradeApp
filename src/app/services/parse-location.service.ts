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

  /**
   * Recibe coordenadas y nos duelve datos de dirección sobre el lugar de las coordendas.
   * @param coordenadas Coordenadas del lugar del que queremos obtener los datos de dirección.
   */
  public parseDireccion(coordenadas: LatLng): Promise<NativeGeocoderResult[]> {
    return this.nativeGeocoder.reverseGeocode(coordenadas.lat, coordenadas.lng, this.options)
      .then(result => {
        return result;
      });
  }

  /**
   * Recibe una dirección y nos devuelve las coordenadas de esta.
   * @param direccion Dirección del lugar el cual queremos obtener las coordenadas.
   */
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
